import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {LogService} from "../log/log.service";

@Component({
    selector: "app-tags",
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.css"]
})
export class TagsComponent implements OnInit {

    @Input() header: string;
    @Input() tags: Set<string> = new Set();

    @Output() selected = new EventEmitter<string>();

    constructor(private log: LogService) {
    }

    ngOnInit() {
    }

    sortedTags() {
        return Array.from(this.tags).sort();
    }
    onSelect(tag) {
        this.log.debug(`selected ${tag}`);
        this.selected.emit(tag);
    }
}
