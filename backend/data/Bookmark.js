// @formatter:off
const MD5       = require("md5");
const TabooSet  = require("./TabooSet");
// @formatter:on

/**
 * a class defining our Bookmark.
 */
class Bookmark {


    constructor(url, title, tags) {
        if (!url || !url.trim()) {
            throw new Error("url may not be empty");
        }
        this.url = url;
        if (!title || !title.trim()) {
            this.title = url;
        } else {
            this.title = title;
        }
        this.tags = new TabooSet();
        if (tags) tags.forEach(tag => this.addTag(tag));
        if (this.tags.size() == 0) {
            this.addTag(Bookmark.untagged);
        }
        this.id = MD5(url);
    }

    static sanitize(tag) {
        return (!tag) ? "": tag.trim().replace(/\s/g, "_");
    }

    addTag(tag) {
        if (tag) {
            const sanitized = Bookmark.sanitize(tag);
            if (sanitized) {
                if (this.tags.size() === 1) {
                    this.tags.remove(Bookmark.untagged)
                }
                this.tags.add(sanitized.toLowerCase());
            }
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

Bookmark.untagged = "untagged";

module.exports = Bookmark;
