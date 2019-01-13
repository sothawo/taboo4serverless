import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {Bookmark} from '../data/bookmark';
import {LogService} from '../log/log.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges {
    private id: string;
    private url: string;
    private title: string;
    private tags: string;

    @Input() bookmark: Bookmark;
    @Output() editCancelled = new EventEmitter<string>();
    @Output() editOk = new EventEmitter<Bookmark>();

    constructor(private logger: LogService,) {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        console.log(changes);
        this.setBookmark(changes.bookmark.currentValue);
    }

    setBookmark(bookmark: Bookmark) {
        this.logger.info('editing bookmark');
        this.logger.debug(bookmark);
        if (bookmark) {
            this.id = bookmark.id;
            this.url = bookmark.url;
            this.title = bookmark.title;
            this.tags = bookmark.joinedTags();
        }
    }

    onOk() {
        const tags = this.splitTags(this.tags);
        const bookmark = new Bookmark(this.id, this.url, this.title, tags);
        this.editOk.emit(bookmark);
    }

    splitTags(tags: string) {
        return tags.split(/[\s;,.]/).filter(it => it !== '');
    }

    onCancel() {
        this.editCancelled.emit('cancelled');
    }
}
