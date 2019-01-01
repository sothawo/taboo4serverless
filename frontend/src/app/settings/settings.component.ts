import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "ngx-store";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    @LocalStorage()
    apiUrl: string;

    @LocalStorage()
    apiKey: string;

    constructor() {
    }

    ngOnInit() {
    }

}
