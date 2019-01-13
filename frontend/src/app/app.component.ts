import {Component} from '@angular/core';
import {LogService} from './log/log.service';
import {BackendService} from './backend.service';
import {Config} from './settings/config';
import {Bookmark} from './data/bookmark';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    settingsVisible = false;
    selectedTagsVisible = true;
    availableTagsVisible = true;
    logVisible = false;
    editorVisible = false;
    bookmarksVisible = true;
    selectedTags: Set<string> = new Set();
    availableTags: Set<string> = new Set();
    backendConfig = '{?}';
    bookmarks: Bookmark[] = [];
    editorBookmark: Bookmark;
    private layoutSettings: boolean[];

    constructor(private logger: LogService, private backend: BackendService) {
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
        const start = Date.now();
        this.backend.config()
            .subscribe((config: Config) => {
                this.logger.info(`got config after ${Date.now() - start} ms.`);
                this.logger.debug(config);
                this.backendConfig = JSON.stringify(config);
            });
    }

    editBookmark(bookmark: Bookmark) {
        this.logger.debug(`editing ${bookmark}`);
        this.editorBookmark = bookmark;
        this.storeLayout();
    }

    onAddBookmark() {
        this.logger.debug(`editing new bookmark`);
        this.editorBookmark = undefined;
        this.storeLayout();
    }

    /**
     * called when a bookmark was added/edited.
     */
    saveBookmark(bookmark: Bookmark) {
        this.logger.info(`saving bookmark`);
        this.logger.debug(bookmark);
        const start = Date.now();
        this.backend.saveBookmark(bookmark)
            .subscribe((savedBookmark: Bookmark) => {
                    this.logger.info(`saved bookmark after ${Date.now() - start} ms.`);
                    this.logger.debug(savedBookmark);
                    this.selectedTags.clear();
                    savedBookmark.tags.forEach(it => this.selectedTags.add(it));
                    this.loadBookmarks();
                    this.restoreLayout();
                },
                error => {
                    this.logger.error(error);
                });

    }

    storeLayout() {
        this.logger.debug('store layout...');
        this.layoutSettings = [];
        this.layoutSettings.push(this.selectedTagsVisible);
        this.layoutSettings.push(this.availableTagsVisible);
        this.layoutSettings.push(this.logVisible);
        this.layoutSettings.push(this.settingsVisible);
        this.selectedTagsVisible = false;
        this.availableTagsVisible = false;
        this.settingsVisible = false;
        this.bookmarksVisible = false;
        this.editorVisible = true;
    }

    restoreLayout() {
        this.logger.debug('restore layout...');
        this.editorVisible = false;
        this.bookmarksVisible = true;
        this.selectedTagsVisible = this.layoutSettings[0];
        this.availableTagsVisible = this.layoutSettings[1];
        this.logVisible = this.layoutSettings[2];
        this.settingsVisible = this.layoutSettings[3];
        this.layoutSettings = [];
    }

    private initialLoad() {
        this.availableTags.clear();
        this.selectedTags.clear();
        this.bookmarks = [];
        const start = Date.now();
        this.backend.allTags()
            .subscribe((tags: string[]) => {
                    this.logger.info(`got tags after ${Date.now() - start} ms.`);
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
        this.bookmarks = [];
        if (this.selectedTags.size > 0) {
            this.availableTags.clear();
            const start = Date.now();
            this.backend.bookmarksByTags(Array.from(this.selectedTags))
                .subscribe((bookmarks: Bookmark[]) => {
                        this.logger.info(`got bookmarks after ${Date.now() - start} ms.`);
                        this.logger.debug(bookmarks);
                        bookmarks.map(it => new Bookmark(it.id, it.url, it.title, it.tags))
                            .forEach(it => this.bookmarks.push(it));

                        this.buildAvailableTags();
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
            bookmark.tags.forEach(tag => bookmarksTags.add(tag));
        });

        this.availableTags = new Set(Array.from(bookmarksTags)
            .filter(tag => !this.selectedTags.has(tag)));
    }

    private onTest() {
        this.selectedTags.clear();
        this.selectedTags.add('taboo4');
        this.loadBookmarks();
    }
}
