// @formatter:off
require("chai").should();
const Bookmark  = require("./Bookmark");
const DBEntry  = require("./DBEntry");
// @formatter:on

describe("a DBEntry", () => {
    it("returns it's Bookmark", () => {
        const bookmark = new Bookmark("htp://book.mark", "a title", ["tag02", "tag01"])
        const dbEntry = new DBEntry("partition", "sort", bookmark);

        const bookmark2 = dbEntry.getBookmark();

        bookmark2.should.deep.equal(bookmark);
    });
});
