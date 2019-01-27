import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {Bookmark} from '../data/bookmark';
import {LogService} from '../log/log.service';
import {BackendService} from '../backend.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnChanges {
    @Input() bookmark: Bookmark;
    @Output() editCancelled = new EventEmitter<string>();
    @Output() editOk = new EventEmitter<Bookmark>();
    private id: string;
    url: string;
    title: string;
    tags: string;

    constructor(private logger: LogService, private backend: BackendService) {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.setBookmark(changes.bookmark.currentValue);
    }

    setBookmark(bookmark: Bookmark) {
        if (bookmark) {
            this.logger.info('editing bookmark');
            this.logger.debug(bookmark);
            this.id = bookmark.id;
            this.url = bookmark.url;
            this.title = bookmark.title;
            this.tags = bookmark.joinedTags();
        }
    }

    onOk() {
        if (!this.url || this.url.search(/^https?:\/\//i)) {
            // @ts-ignore
            bootbox.alert({
                message: `Invalid URL: "${this.url}"`,
                buttons: {
                    ok: {
                        label: 'ok',
                        className: 'btn-secondary'
                    }
                }
            });
        } else {
            const tags = this.tags ? this.splitTags(this.tags) : [];
            const bookmark = new Bookmark(this.id, this.url, this.title, tags);
            this.editOk.emit(bookmark);
        }
    }

    splitTags(tags: string) {
        return tags.split(/[\s;,.]/).filter(it => it !== '');
    }

    onCancel() {
        this.editCancelled.emit('cancelled');
    }

    onLoadTitle() {
        const start = Date.now();
        this.backend.loadTitle(this.url)
            .subscribe((title) => {
                    this.logger.info(`got tile after ${Date.now() - start} ms.`);
                    this.logger.debug(title);
                    this.title = title;
                },
                error => {
                    this.logger.error(error);
                });
    }
}
