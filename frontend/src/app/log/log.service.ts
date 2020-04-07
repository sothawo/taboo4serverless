import {Injectable} from '@angular/core';

import {LogData, LogLevel, LogListener} from './log-listener';
import {LocalStorageService} from '../local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    listeners: Set<LogListener> = new Set();
    messages: LogData[] = [];

    constructor(private localStorageService: LocalStorageService) {
        // add a console listener
        this.listeners.add(new class implements LogListener {
            log(logData: LogData) {
                console.log(logData.level, logData.data);
            }
        });

        this.localStorageService.get('logLevel', LogLevel.INFO);
    }

    set logLevel(logLevel: LogLevel) {
        this.localStorageService.set('logLevel', logLevel);
    }

    get logLevel(): LogLevel {
        const logLevel = this.localStorageService.get('logLevel', 'INFO');
        return LogLevel[logLevel];
    }

    static format(o: any): string {
        let msg = '';
        if (typeof o === 'string') {
            msg = o;
        } else {
            msg = JSON.stringify(o, null, 2);
        }
        return msg;
    }

    addListener(listener: LogListener) {
        this.listeners.add(listener);
    }

    removeListener(listener: LogListener) {
        this.listeners.delete(listener);
    }

    log(logData: LogData) {
        if (this.logLevelNum(logData.level) >= this.logLevelNum(LogLevel[this.localStorageService.get('logLevel')])) {
            this.messages.push(logData);
            this.listeners.forEach(listener => listener.log(logData));
        }
    }

    clear() {
        this.messages = [];
    }

    debug(o: any) {
        this.log(new LogData(LogLevel.DEBUG, o));
    }

    info(o: any) {
        this.log(new LogData(LogLevel.INFO, o));
    }

    warn(o: any) {
        this.log(new LogData(LogLevel.WARN, o));
    }

    error(o: any) {
        this.log(new LogData(LogLevel.ERROR, o));
    }

    private logLevelNum(logLevel: LogLevel): number {
        let num = -1;
        switch (logLevel) {
            case LogLevel.DEBUG:
                num = 0;
                break;
            case LogLevel.INFO:
                num = 1;
                break;
            case LogLevel.WARN:
                num = 2;
                break;
            case LogLevel.ERROR:
                num = 3;
                break;

        }
        return num;
    }
}
