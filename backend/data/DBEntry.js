/**
 * class defining an entry into the database. It has a partitionkey, a sort key, both strings making up the primary key and
 * a Bookmark object.
 */
class DBEntry {
    constructor(partition, sort, bookmark) {
        this.partition = partition;
        this.sort = sort;
        this.bookmark = bookmark;
    }
}

module.exports = DBEntry;
