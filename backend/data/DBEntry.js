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
        this.bookmarkId = bookmark.id;
        this.bookmarkUrl = bookmark.url;
        this.bookmarkTitle = bookmark.title;
        this.bookmarkTags = bookmark.tags.getElements();
    }

    getBookmark() {
        return new Bookmark(this.bookmarkUrl, this.bookmarkTitle, this.bookmarkTags)
    }
}

module.exports = DBEntry;
