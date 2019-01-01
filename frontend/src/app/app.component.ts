import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'taboo4';
    settingsVisible = false;

    onSettingsClicked() {
        this.settingsVisible = !this.settingsVisible;
    }
}
