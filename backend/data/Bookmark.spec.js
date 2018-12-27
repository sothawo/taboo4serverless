// @formatter:off
require("chai").should();
const md5       = require("md5");
const Bookmark  = require("./Bookmark");
const TabooSet  = require("./TabooSet");
// @formatter:on

describe("a Bookmark", () => {

    it("has the url and titel and tags set", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag1", "tag2"];

        const bookmark = new Bookmark(url, title, tags);

        bookmark.url.should.equal(url);
        bookmark.title.should.equal(title);
        bookmark.tags.should.deep.equal(new TabooSet(tags))
    });

    it("has an id which is the md5 sum of the url", () => {
        const url = "http://some.url";
        const title = " a test title";

        const bookmark = new Bookmark(url, title);

        bookmark.id.should.equal(md5(url));
    });

    it("does not store empty tags", () => {
        const url = "http://some.url";
        const title = " a test title";
        const bookmark = new Bookmark(url, title);

        bookmark.addTag(null);
        bookmark.addTag(undefined);
        bookmark.addTag("");
        bookmark.addTag("   ");

        bookmark.tags.size().should.equal(0);
    });

    it("converts a tag to lowercase", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag1", "tag2"];
        const bookmark = new Bookmark(url, title, tags);

        bookmark.addTag("TAG3");

        bookmark.tags.should.deep.equal(new TabooSet(["tag1", "tag2", "tag3"]));
    });

    it("does not add a tag twice", () => {
        const url = "http://some.url";
        const title = " a test title";
        const bookmark = new Bookmark(url, title);

        bookmark.addTag("tag1");
        bookmark.addTag("tag1");

        bookmark.tags.should.deep.equal(new TabooSet(["tag1"]));
    });

    it("has a sorted joined string", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag2", "tag1"];

        const bookmark = new Bookmark(url, title, tags);

        bookmark.joinedTags().should.equal("tag1, tag2");
    })
    ;
});
