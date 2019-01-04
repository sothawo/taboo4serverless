import {Component} from "@angular/core";
import {LogService} from "./log.service";
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

    constructor(private log: LogService, private backend: BackendService) {
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
        this.log.debug(`tag ${tag} from selected tags clicked`);
        // remove from selected
        this.selectedTags.delete(tag);
        // todo: load bookmarks for selected tags, recalculate available tags
        // for the time being, add to available
        this.availableTags.add(tag);

    }

    onAvailableTagsClicked(tag) {
        this.log.debug(`tag ${tag} from available tags clicked`);
        this.selectedTags.add(tag);
        // todo: load bookmarks for selected tags, recalculate available tags
        // for the time being, remove from available
        this.availableTags.delete(tag);
    }

    onTest() {
        this.backend.config()
            .subscribe((config: Config) => {
                this.log.debug(config);
                this.backendConfig = JSON.stringify(config);
            });
    }

    private initialLoad() {
        this.availableTags.clear();
        this.selectedTags.clear();

        this.backend.allTags()
            .subscribe((tags: string[]) => {
                this.log.debug(tags);
                tags.forEach(tag => this.availableTags.add(tag));
            });
    }
}
