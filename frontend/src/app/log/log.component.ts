import {Component, OnInit} from '@angular/core';
import {LogService} from "./log.service";

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, LogListener {

    messages: string[] = [];

    constructor(private log: LogService) {
    }

    ngOnInit() {
    }

    add(...messages: string[]) {
        messages.forEach(it => this.messages.push(it));
    }

    clear() {
        this.messages = [];
    }
}
