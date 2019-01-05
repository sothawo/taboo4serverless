import {Component, Input, OnInit} from "@angular/core";
import {Bookmark} from "../data/bookmark";

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

    constructor() {
    }

    ngOnInit() {
    }

}
