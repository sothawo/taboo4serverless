// @formatter:off
const Bookmark  = require("./Bookmark");
// @formatter:on

/**
 * class defining an entry into the database. It has a partitionkey, a sort key, both strings making up the primary key and
 * the relevant fields of a Bookmark object. As a Bookmark contains a TabooSet object, this is converted to an array here.
 */
class DBEntry {
    constructor(partition, sort, bookmark) {
        this.partition = partition;
        this.sort = sort;
        this.bookmark = bookmark;
    }

    getBookmark() {
        return  this.bookmark
    }
}

module.exports = DBEntry;
