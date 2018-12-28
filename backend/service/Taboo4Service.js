// @formatter:off
const DBEntry   = require("../data/DBEntry");
const Bookmark  = require("../data/Bookmark");
// @formatter:on

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
     * @return {Promise<Bookmark>}
     */
    async saveBookmark(bookmark) {
        await this.saveDBEntry(new DBEntry(bookmark.id, "id", bookmark));
        await Promise.all(
            bookmark.tags.getElements()
                .map(async (tag) => {
                    await this.saveDBEntry(new DBEntry(tag, bookmark.id, bookmark));

                })
        );
        return bookmark;
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
            this.dynamoDBcDocClient.put(params, function (err, data) {
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
                this.dynamoDBcDocClient.get(params, function (err, data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (data.Item && data.Item.bookmark) {
                            const found = data.Item.bookmark;
                            resolve(new Bookmark(found.url, found.title, found.tags.bag_))
                        } else {
                            resolve({});
                        }
                    }
                });
            }
        )
            ;
    }
}

module.exports = Taboo4Service;
