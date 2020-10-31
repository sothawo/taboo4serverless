export class Bookmark {

    id?: string;
    url: string;
    title?: string;
    tags: string[];

    constructor(id: string|undefined, url: string, title: string|undefined, tags: string[]) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.tags = tags;
    }

    joinedTags() {
        return this.tags.sort().join(', ');
    }
}

