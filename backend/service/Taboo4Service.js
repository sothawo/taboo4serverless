const DBEntry = require("../data/DBEntry");
const Bookmark = require("../data/Bookmark");
const TabooSet = require("../data/TabooSet");
const http = require("http");
const https = require("https");
const cheerio = require("cheerio");

/**
 * the taboo4 service implementing the logic for managing the bookmarks.
 */
class Taboo4Service {

    constructor(dynamoDBcDocClient, tableName) {
        this.dynamoDBcDocClient = dynamoDBcDocClient;
        this.tableName = tableName;
    }


    /**
     * saves a bookmark to the database. creates an entry for the ID and one for each tag.
     * @param bookmark the bookmark to save
     * @param previousId on updats the id of the bookmark to change. This might be different to the bookmark's id when the url was updated.
     * @return {Promise<Bookmark>}
     */
    async saveBookmark(bookmark, previousId = undefined, buildAllTags = true) {
        // delete the previous version and readd it even if the id is not changed. Otherwise we would need to load the
        // old version and match the tags to the new one to find if some tags were removed
        if (previousId && previousId != "") {
            await this.deleteBookmarkById(previousId, false);
        }
        await this.saveDBEntry(new DBEntry(bookmark.id, "id", bookmark));
        await Promise.all(
            bookmark.tags.getElements()
                .map(async tag => {
                    await this.saveDBEntry(new DBEntry(tag, bookmark.id, bookmark));

                })
        );
        if (buildAllTags) {
            await this.saveDBEntry(new DBEntry("all tags", "all tags", await this.allTagsFromDB()));
        }
        return bookmark;
    }

    /**
     * saves an aray of bookmarks.
     * @param bookmarks the bookmarks to save
     * @return {Promise<string>} success message
     */
    async saveBookmarks(bookmarks) {
        await Promise.all(
            bookmarks.map(async bookmark => {
                await this.saveBookmark(bookmark, undefined, false);
            })
        );
        await this.saveDBEntry(new DBEntry("all tags", "all tags", await this.allTagsFromDB()));
        return "Bookmarks saved"
    }

    /**
     * saves a single entry to the database
     * @param dbEntry the entry to save
     * @returns {Promise<String>}
     */
    async saveDBEntry(dbEntry) {
        const params = {
            TableName: this.tableName,
            Item: dbEntry
        };

        return new Promise((resolve, reject) => {
            this.dynamoDBcDocClient.put(params, (err, data) => {
                if (err) {
                    reject(new Error("Unable to store DBEntry. Error JSON:" + JSON.stringify(err, null, 2)));
                } else {
                    resolve("DBEntry stored.");
                }
            });
        });
    }

    /**
     * retrieves a Bookmark.
     * @param id the Bookmark id
     * @return {Promise<Bookmark>}
     */
    async loadBookmark(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                partition: id,
                sort: "id"
            }
        };

        return new Promise((resolve, reject) => {
                this.dynamoDBcDocClient.get(params, (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (data.Item && data.Item.bookmark) {
                            const found = data.Item.bookmark;
                            resolve(new Bookmark(found.url, found.title, found.tags.bag_))
                        } else {
                            resolve(undefined);
                        }
                    }
                });
            }
        );
    }

    /**
     * retrieves all bookmarks.
     * @return {Promise<[Bookmark]>}
     */
    async allBookmarks() {
        const params = {
            TableName: this.tableName,
            FilterExpression: "sort = :srt",
            ExpressionAttributeValues: {":srt": "id"}
        };

        return new Promise((resolve, reject) => {
            const bookmarks = [];

            const onScan = (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    data.Items
                        .filter( it => (it && it.bookmark))
                        .map(it => it.bookmark)
                        .map(it => new Bookmark(it.url, it.title, it.tags.bag_))
                        .forEach(it => bookmarks.push(it));
                    if (typeof data.LastEvaluatedKey != "undefined") {
                        params.ExclusiveStartKey = data.LastEvaluatedKey;
                        this.dynamoDBcDocClient.scan(params, onScan);
                    } else {
                        resolve(bookmarks);
                    }
                }
            };
            this.dynamoDBcDocClient.scan(params, onScan);
        });
    }

    /**
     * returns all Bookmarks from the correspondig db entry.
     * @return {Promise<[String]>}
     */
    async allTags() {
        const params = {
            TableName: this.tableName,
            Key: {
                partition: "all tags",
                sort: "all tags"
            }
        };

        return new Promise((resolve, reject) => {
                this.dynamoDBcDocClient.get(params, (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (data.Item && data.Item.bookmark) {
                            resolve(data.Item.bookmark)
                        } else {
                            resolve(undefined);
                        }
                    }
                });
            }
        );
    }

    /**
     * retrieves all tags as sorted array.
     * @return {Promise<[String]>}
     */
    async allTagsFromDB() {
        return this.allBookmarks().then(bookmarks => {
            let tagSet = new TabooSet();
            bookmarks.forEach(bookmark => {
                tagSet = tagSet.union(bookmark.tags);
            });
            return tagSet.bag_;
        })
    }

    /**
     * returns all Bookmarks for the given tags.
     * @param array of tags
     * @returns {Promise<[Bookmark]>}
     */
    async bookmarksByTags(tags) {
        const allBookmarks = new Map();
        if (tags) {
            const requiredTags = new TabooSet(tags);

            await Promise.all(
                tags.map(async tag => {
                    let bookmarks = (await this.bookmarkByTag(tag));
                    bookmarks.forEach(bookmark => {
                        if (bookmark.tags.intersection(requiredTags).size() == requiredTags.size()) {
                            allBookmarks.set(bookmark.id, bookmark);
                        }
                    });
                })
            );
        }
        return Array.from(allBookmarks.values())
    }

    /**
     * returns all Bookmarks for a single tag.
     * @param tag
     * @returns {Promise<[Bookmark]>}
     */
    async bookmarkByTag(tag) {
        const params = {
            TableName: this.tableName,
            KeyConditionExpression: "#prt = :prt",
            ExpressionAttributeNames: {"#prt": "partition"},
            ExpressionAttributeValues: {":prt": tag}
        };

        return new Promise((resolve, reject) => {
                this.dynamoDBcDocClient.query(params, (err, data) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (data.Items) {
                            resolve(data.Items
                                .map(it => it.bookmark)
                                .map(it => new Bookmark(it.url, it.title, it.tags.bag_))
                            );
                        } else {
                            resolve({});
                        }
                    }
                });
            }
        );
    }

    /**
     * deletes the database entry with the given partition and sort key.
     * @param partition
     * @param sort
     * @return {Promise<string>}
     */
    async deleteDBEntry(partition, sort) {
        const params = {
            TableName: this.tableName,
            Key: {
                partition: partition,
                sort: sort
            }
        };

        return new Promise((resolve, reject) => {
            this.dynamoDBcDocClient.delete(params, (err, data) => {
                if (err) {
                    reject(new Error("Unable to delete DBEntry. Error JSON:" + JSON.stringify(err, null, 2)));
                } else {
                    resolve("DBEntry stored.");
                }
            });

        });
    }

    /**
     * deletes a bookmark from the database.
     * @param bookmark the bookmark to delete
     * @parambuildAllTags wether to build the alltags entry after deleting
     * @return {Promise<string>}
     */
    async deleteBookmark(bookmark, buildAllTags = true) {
        if (bookmark) {
            await this.deleteDBEntry(bookmark.id, "id");
            await Promise.all(
                bookmark.tags.getElements()
                    .map(async tag => {
                        await this.deleteDBEntry(tag, bookmark.id);
                    })
            );
            if (buildAllTags) {
                await this.saveDBEntry(new DBEntry("all tags", "all tags", await this.allTagsFromDB()));
            }
            return "deleted";
        }
    }

    async deleteBookmarkById(id, buildAllTags = true) {
        return this.deleteBookmark(await this.loadBookmark(id), buildAllTags);
    }

    async loadTitle(url) {
        return new Promise((resolve) => {
            let callback = response => {
                let body = "";
                response.on("data", d => {
                    return body += d;
                });
                response.on("end", () => {
                    const html = cheerio.load(body);
                    const title = html('title').html();
                    resolve(title.trim());
                })
            };
            if (url.startsWith("https://")) {
                https.get(url, callback);
            } else {
                http.get(url, callback);
            }
        });
    }
}

module.exports = Taboo4Service;
