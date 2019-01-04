import {Component} from "@angular/core";
import {LogService} from "./log/log.service";
import {BackendService} from "./backend.service";
import {Config} from "./settings/config";

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

    constructor(private logger: LogService, private backend: BackendService) {
    }

    ngOnInit() {
        this.initialLoad();
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
        // todo: load bookmarks for selected tags, recalculate available tags
        // for the time being, add to available
        this.availableTags.add(tag);

    }

    onAvailableTagsClicked(tag) {
        this.logger.debug(`tag ${tag} from available tags clicked`);
        this.selectedTags.add(tag);
        // todo: load bookmarks for selected tags, recalculate available tags
        // for the time being, remove from available
        this.availableTags.delete(tag);
    }

    onTest() {
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
}
