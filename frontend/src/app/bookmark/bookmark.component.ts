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

    @Input()
    even: boolean

    constructor(private logger: LogService) {
    }

    ngOnInit() {
    }

    onEdit() {
        this.logger.warn(`edit of "${this.bookmark.title}" requested`);
    }

    onDelete() {
        this.logger.warn(`delete of id "${this.bookmark.title}" requested`);
    }
}
