import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bookmark} from '../data/bookmark';
import {LogService} from '../log/log.service';
import {BackendService} from '../backend.service';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

    @Input() bookmark: Bookmark;
    @Output() deleted = new EventEmitter<string>();
    @Output() toEdit = new EventEmitter<Bookmark>();

    constructor(private logger: LogService, private backend: BackendService) {
    }

    ngOnInit() {
    }

    onEdit() {
        this.logger.info(`edit of "${this.bookmark.title}" requested`);
        this.toEdit.emit(this.bookmark);
    }

    onDelete() {
        this.logger.warn(`delete of id "${this.bookmark.title}" requested`);
        // @ts-ignore
        bootbox.confirm({
            message: 'Are you sure to delete ' + this.bookmark.url + '?',
            buttons: {
                confirm: {
                    label: 'yes',
                    className: 'btn-secondary'
                },
                cancel: {
                    label: 'no',
                    className: 'btn-outline-secondary'
                }
            },
            callback: (confirmed) => {
                if (confirmed) {
                    this.logger.info('deleting bookmark...');
                    this.backend.deleteBookmark(this.bookmark.id).subscribe((msg) => {
                        this.deleted.emit(this.bookmark.id);
                    });
                }
            }
        });
    }
}
