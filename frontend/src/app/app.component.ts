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

    backendConfig = "{?}";
    constructor(private log: LogService, private backend: BackendService) {

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

    onTest() {
        this.backend.config()
            .subscribe((config: Config) => {
                this.log.debug(config);
                this.backendConfig = JSON.stringify(config);
            });

    }
}
