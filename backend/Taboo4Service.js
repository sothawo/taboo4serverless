// @formatter:off
const DBEntry = require("./DBEntry");
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
     */
    saveBookmark(bookmark) {
        this.saveDBEntry(new DBEntry(bookmark.id, "", bookmark));
        bookmark.tags.forEach((tag) => {
            this.saveDBEntry(new DBEntry(tag, bookmark.id, bookmark));
        });
    }

    /**
     * saves a single entry to the database
     * @param dbEntry the entry to save
     */
    saveDBEntry(dbEntry) {
        let params = {
            TableName: this.tableName,
            Item: dbEntry
        };

        // todo: error handling
        this.dynamoDBcDocClient.put(params, (err, data) => {
        });
    }
}

module.exports = Taboo4Service;
