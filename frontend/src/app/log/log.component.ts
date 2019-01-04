import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

    messages: string[] = [];

    constructor() {
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
