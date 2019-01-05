// @formatter:off
const chai      = require("chai");
const expect    = chai.expect;
const should    = chai.should();
const md5       = require("md5");
const Bookmark  = require("./Bookmark");
const TabooSet  = require("./TabooSet");
// @formatter:on

describe("a Bookmark", () => {

    it("must have an url set", () => {
        const title = " a test title";
        const tags = ["tag1", "tag2"];

        should.throw(() => new Bookmark(null, title, tags))
        should.throw(() => new Bookmark("", title, tags))
    });

    it("uses the url as title when no title is given", () => {
        const url = "http://some.url";
        const title = "";
        const tags = ["tag1", "tag2"];

        const bookmark = new Bookmark(url, title, tags);

        bookmark.url.should.equal(url);
        bookmark.title.should.equal(url);
        bookmark.tags.should.deep.equal(new TabooSet(tags))
    });

    it("adds an untagged tag when no tags are set", () => {
        const url = "http://some.url";
        const title = " a test title";

        let bookmark = new Bookmark(url, title);

        bookmark.url.should.equal(url);
        bookmark.title.should.equal(title);
        bookmark.tags.should.deep.equal(new TabooSet([Bookmark.untagged]));

        bookmark = new Bookmark(url, title, []);

        bookmark.url.should.equal(url);
        bookmark.title.should.equal(title);
        bookmark.tags.should.deep.equal(new TabooSet([Bookmark.untagged]));
    });

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

        bookmark.tags.size().should.equal(1);
        bookmark.tags.getElements()[0].should.equal(Bookmark.untagged);
    });

    it("converts a tag to lowercase", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag1", "tag2"];
        const bookmark = new Bookmark(url, title, tags);

        bookmark.addTag("TAG3");

        bookmark.tags.should.deep.equal(new TabooSet(["tag1", "tag2", "tag3"]));
    });

    it("converts whitespace in tags to underscores", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag 1"];
        const bookmark = new Bookmark(url, title, tags);

        bookmark.tags.should.deep.equal(new TabooSet(["tag_1"]));

    });

    it("does not have the untagged tag when other tags are set", () => {
        const url = "http://some.url";
        const title = " a test title";
        const bookmark = new Bookmark(url, title);

        bookmark.tags.size().should.equal(1);
        bookmark.tags.getElements()[0].should.equal(Bookmark.untagged);

        bookmark.addTag("sometag");

        bookmark.tags.size().should.equal(1);
        bookmark.tags.getElements()[0].should.equal("sometag");
    });

    it("does not add a tag twice", () => {
        const url = "http://some.url";
        const title = " a test title";
        const bookmark = new Bookmark(url, title);

        bookmark.addTag("tag1");
        bookmark.addTag("tag1");

        bookmark.tags.should.deep.equal(new TabooSet(["tag1"]));
    });

    it("has a simplified version with an array of tags", () => {
        const url = "http://some.url";
        const title = " a test title";
        const tags = ["tag1", "tag2"];

        const simplifiedBookmark = new Bookmark(url, title, tags).simplify();

        simplifiedBookmark.id.should.equal(md5(url));
        simplifiedBookmark.url.should.equal(url);
        simplifiedBookmark.title.should.equal(title);
        simplifiedBookmark.tags.should.deep.equal(tags)

    });
});
