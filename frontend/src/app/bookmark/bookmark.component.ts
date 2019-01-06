import {Component, Input, OnInit} from "@angular/core";
import {Bookmark} from "../data/bookmark";
import {LogService} from "../log/log.service";

@Component({
    selector: "app-bookmark",
    templateUrl: "./bookmark.component.html",
    styleUrls: ["./bookmark.component.css"]
})
export class BookmarkComponent implements OnInit {

    @Input()
    bookmark: Bookmark;

    constructor(private logger: LogService) {
    }

    ngOnInit() {
    }

    onEdit() {
        this.logger.warn(`edit of "${this.bookmark.title}" requested`);
    }

    onDelete() {
        this.logger.warn(`delete of id "${this.bookmark.title}" requested`);
        // @ts-ignore
        bootbox.confirm({
            message: 'Are you sure to delete ' + this.bookmark.url + '?',
            buttons: {
                confirm: {
                    label: "yes",
                    className: "btn-secondary"
                },
                cancel: {
                    label: "no",
                    className: "btn-outline-secondary"
                }
            },
            callback: (confirmed) => {
                if (confirmed) {
                    this.logger.info("deleting bookmark...");
                    // todo: delete
                }
            }
        });
    }
}
