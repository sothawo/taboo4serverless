import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {SettingsComponent} from './settings/settings.component';
import {HttpClientModule} from '@angular/common/http';
import {TagsComponent} from './tags/tags.component';
import {LogComponent} from './log/log.component';
import {BookmarkComponent} from './bookmark/bookmark.component';
import {EditorComponent} from './editor/editor.component';

@NgModule({
    declarations: [
        AppComponent,
        SettingsComponent,
        TagsComponent,
        LogComponent,
        BookmarkComponent,
        EditorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
