// @formatter:off
const md5 = require('md5');
// @formatter:on

/**
 * a class defining our Bookmark.
 */
class Bookmark {
    constructor(url, title, tags) {
        this.url = url;
        this.title = title;
        this.tags = [].concat(tags);
        this.id = md5(url);
    }
}

module.exports = Bookmark;
