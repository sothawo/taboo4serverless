import {Component, Input, OnInit} from '@angular/core';
import {LogData, LogLevel} from '../log/log-listener';
import {LogService} from '../log/log.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    @Input()
    set apiUrl(apiUrl: string) {
        this.localStorageService.set('apiUrl', apiUrl);
    }
    get apiUrl(): string {
        return this.localStorageService.get('apiUrl');
    }

    @Input()
    set apiKey(apiKey: string) {
        this.localStorageService.set('apiKey', apiKey);
    }
    get apiKey(): string {
        return this.localStorageService.get('apiKey');
    }

    logLevels: LogLevel[] = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];

    @Input()
    set logLevel(logLevel: LogLevel) {
        this.localStorageService.set('logLevel', logLevel.toString());
    }
    get logLevel(): LogLevel {
        return LogLevel[this.localStorageService.get('logLevel')];
    }

    constructor(private logger: LogService, private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
    }

    logLevelSelected(logLevel: LogLevel) {
        this.logLevel = logLevel;
        this.logger.log(new LogData(this.logLevel, `setting LogLevel to ${this.logLevel}`));
    }
}
