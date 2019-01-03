import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: "app-tags",
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.css"]
})
export class TagsComponent implements OnInit {

    @Input()
    header: string;

    @Input()
    tags: string[] = [];

    constructor() {
    }

    ngOnInit() {
    }

}
