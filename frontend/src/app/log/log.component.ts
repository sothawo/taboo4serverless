import {Component, OnInit} from '@angular/core';
import {LogService} from "./log.service";
import {LogData, LogListener} from "./log-listener";

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, LogListener {

    messages: string[] = [];

    constructor(private logService: LogService) {
        logService.messages.forEach(it => this.log(it));
    }

    ngOnInit() {
        this.logService.addListener(this);
    }

    clear() {
        this.messages = [];
        this.logService.clear();
    }

    log(logData : LogData) {
        this.messages.push(this.format(logData));
    }

    private format(logData: LogData) {
        return `${logData.level}\n${LogService.format(logData.data)}`;
    }
}
