// @formatter:off
const DBEntry = require("../data/DBEntry");
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
     * @return {Promise<Bookemark>}
     */
    async saveBookmark(bookmark) {
        await this.saveDBEntry(new DBEntry(bookmark.id, "id", bookmark));
        bookmark.tags.forEach(async (tag) => {
            await this.saveDBEntry(new DBEntry(tag, bookmark.id, bookmark));
        });

        return bookmark;
    }

    /**
     * saves a single entry to the database
     * @param dbEntry the entry to save
     * @returns {Promise<String>}
     */
    async saveDBEntry(dbEntry) {
        let params = {
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
}

module.exports = Taboo4Service;
