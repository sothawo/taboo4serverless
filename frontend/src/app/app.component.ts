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

    selectedTags: string[] = [];
    availableTags: string[] = [];

    backendConfig = "{?}";

    constructor(private log: LogService, private backend: BackendService) {
    }

    ngOnInit() {
        this.initialLoad();
    }

    onSettingsClicked() {
        this.settingsVisible = !this.settingsVisible;
    }

    onSelectedTagsClicked() {
        this.selectedTagsVisible = !this.selectedTagsVisible;
    }

    onAvailableTagsClicked() {
        this.availableTagsVisible = !this.availableTagsVisible;
    }

    private initialLoad() {
        this.availableTags = [];
        this.selectedTags = [];

        this.backend.allTags()
            .subscribe((tags: string[]) => {
                this.log.debug(tags);
                this.availableTags = tags;
            });
    }

    onTest() {
        this.backend.config()
            .subscribe((config: Config) => {
                this.log.debug(config);
                this.backendConfig = JSON.stringify(config);
            });
    }
}
