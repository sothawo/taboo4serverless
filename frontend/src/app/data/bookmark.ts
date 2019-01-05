export class Bookmark {

    constructor(id: string, url: string, title: string, tags: string[]) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.tags = tags;
    }

    id: string;
    url: string;
    title: string;
    tags: string[];

    joinedTags() {
        return this.tags.sort().join(", ");
    }
}

