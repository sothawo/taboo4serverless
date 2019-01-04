import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {WebStorageModule} from "ngx-store";

import {AppComponent} from './app.component';
import {SettingsComponent} from './settings/settings.component';
import {HttpClientModule} from "@angular/common/http";
import { TagsComponent } from './tags/tags.component';
import { LogComponent } from './log/log.component';

@NgModule({
    declarations: [
        AppComponent,
        SettingsComponent,
        TagsComponent,
        LogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        WebStorageModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
