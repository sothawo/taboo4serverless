import {Component, OnInit} from '@angular/core';
import {LocalStorage} from 'ngx-store';
import {LogData, LogLevel} from '../log/log-listener';
import {LogService} from '../log/log.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    @LocalStorage()
    apiUrl: string = '';

    @LocalStorage()
    apiKey: string = '';

    logLevels: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];

    @LocalStorage()
    logLevel: LogLevel = LogLevel.INFO;

    constructor(private logger: LogService) {
    }

    ngOnInit() {
    }

    logLevelSelected(logLevel: LogLevel) {
        this.logLevel = logLevel;
        this.logger.log(new LogData(this.logLevel, `setting LogLevel to ${this.logLevel}`));
    }
}
