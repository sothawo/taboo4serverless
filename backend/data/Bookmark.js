// @formatter:off
const MD5       = require("md5");
const TabooSet  = require("./TabooSet");
// @formatter:on

/**
 * a class defining our Bookmark.
 */
class Bookmark {
    constructor(url, title, tags) {
        this.url = url;
        this.title = title;
        this.tags = new TabooSet();
        if (tags) tags.forEach(tag => this.addTag(tag))
        this.id = MD5(url);
    }

    addTag(tag) {
        if (tag) {
            const trimmed = tag.trim();
            if (trimmed) this.tags.add(tag.toLowerCase());
        }
    }

    joinedTags() {
        return this.tags.getElements().join(", ");
    }

    simplify() {
        return {
            url: this.url,
            title: this.title,
            id: this.id,
            tags: this.tags.getElements()
        };
    }
}

module.exports = Bookmark;
