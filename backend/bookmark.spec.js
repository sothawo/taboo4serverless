require("chai").should();
const md5 = require("md5");
const Bookmark = require("./bookmark");

describe("a Bookmark", () => {

    it("has the url and titel and tags set", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag1", "tag2"];

        const bookmark = new Bookmark(url, title, tags);

        bookmark.url.should.equal(url);
        bookmark.title.should.equal(title);
        bookmark.tags.should.eql(tags)
    });

    it("has an id which is the md5 sum of the url", () => {
        const url = "http://some.url";
        const title = " a test title";

        const bookmark = new Bookmark(url, title);

        bookmark.id.should.equal(md5(url));
    });
});
