import {Component} from "@angular/core";
import {LogService} from "./log/log.service";
import {BackendService} from "./backend.service";
import {Config} from "./settings/config";
import {Bookmark} from "./data/bookmark";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})

export class AppComponent {
    settingsVisible = false;
    selectedTagsVisible: boolean = true;
    availableTagsVisible: boolean = true;
    logVisible: boolean = false;

    selectedTags: Set<string> = new Set();
    availableTags: Set<string> = new Set();

    backendConfig = "{?}";

    bookmarks: Bookmark[] = [];

    constructor(private logger: LogService, private backend: BackendService) {
    }

    ngOnInit() {
        // this.initialLoad();
        // this.bookmarks.push(new Bookmark("id", "url", "title", ["tag1", "tag2"]));
    }

    onSettingsVisibleClicked() {
        this.settingsVisible = !this.settingsVisible;
    }

    onSelectedTagsVisibleClicked() {
        this.selectedTagsVisible = !this.selectedTagsVisible;
    }

    onAvailableTagsVisibleClicked() {
        this.availableTagsVisible = !this.availableTagsVisible;
    }

    onLogVisibleClicked() {
        this.logVisible = !this.logVisible;
    }

    onSelectedTagsClicked(tag) {
        this.logger.debug(`tag ${tag} from selected tags clicked`);
        // remove from selected
        this.selectedTags.delete(tag);
        this.loadBookmarks();

    }

    onAvailableTagsClicked(tag) {
        this.logger.debug(`tag ${tag} from available tags clicked`);
        this.selectedTags.add(tag);
        this.loadBookmarks();
    }

    loadBackendConfig() {
        let start = Date.now();
        this.backend.config()
            .subscribe((config: Config) => {
                this.logger.info(`got config after ${Date.now() - start} ms.`)
                this.logger.debug(config);
                this.backendConfig = JSON.stringify(config);
            });
    }

    private initialLoad() {
        this.availableTags.clear();
        this.selectedTags.clear();

        let start = Date.now();
        this.backend.allTags()
            .subscribe((tags: string[]) => {
                    this.logger.info(`got tags after ${Date.now() - start} ms.`)
                    this.logger.debug(tags);
                    tags.forEach(tag => this.availableTags.add(tag));
                },
                error => {
                    this.logger.error(error);
                });
    }

    /**
     * when tags are selected, loads the corresponding bookmarks and rebuilds the available tags from them.
     */
    private loadBookmarks() {
        if (this.selectedTags.size > 0) {
            // todo recalculate tags
            // this.availableTags.clear();
            this.bookmarks = [];
            let start = Date.now();
            this.backend.bookmarksByTags(Array.from(this.selectedTags))
                .subscribe((bookmarks: Bookmark[]) => {
                        this.logger.info(`got bookmarks after ${Date.now() - start} ms.`)
                        this.logger.debug(bookmarks);
                        bookmarks.map(it => new Bookmark(it.id, it.url, it.title, it.tags))
                            .forEach(it => this.bookmarks.push(it));

                        this.buildAvailableTags()
                    },
                    error => {
                        this.logger.error(error);
                    });
        } else {
            this.initialLoad();
        }
    }

    /**
     * builds the available tags from the displayed bookmarks. available are the bookmarks tags without the selected tags.
     */
    private buildAvailableTags() {
        const bookmarksTags: Set<string> = new Set();
        // no flatMap yet available
        this.bookmarks.forEach(bookmark => {
            bookmark.tags.forEach(tag => bookmarksTags.add(tag))
        });

        this.availableTags = new Set(Array.from(bookmarksTags)
            .filter(tag => !this.selectedTags.has(tag)));
    }

    private onTest() {
        this.selectedTags.clear();
        this.selectedTags.add("taboo4");
        this.loadBookmarks();
    }
}
