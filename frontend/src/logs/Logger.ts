import {LogData, LogLevel} from './LogData';
import {LocalStorage} from '../localstorage/LocalStorage';

export interface LoggerListener {
    log: (logData: LogData) => void
}

export class Logger {

    localStorage: LocalStorage = new LocalStorage();

    constructor(private listener: LoggerListener) {
    }

    debug = (data: any) => this.log(new LogData(LogLevel.DEBUG, data));
    info = (data: any) => this.log(new LogData(LogLevel.INFO, data));
    warn = (data: any) => this.log(new LogData(LogLevel.WARN, data));
    error = (data: any) => this.log(new LogData(LogLevel.ERROR, data));

    private log = (logData: LogData) => {
        const logLevel: LogLevel = this.logLevel(this.localStorage.get('logLevel') || 'INFO');
        if (this.logLevelNum(logData.level) >= this.logLevelNum(logLevel)) {
            this.listener.log(logData);
        }
    };

    logLevel(s: string): LogLevel {
        let logLevel = LogLevel.INFO;
        switch (s) {
            case 'DEBUG':
                logLevel = LogLevel.DEBUG;
                break;
            case 'INFO':
                logLevel = LogLevel.INFO;
                break;
            case 'WARN':
                logLevel = LogLevel.WARN;
                break;
            case 'ERROR':
                logLevel = LogLevel.ERROR;
                break;
        }
        return logLevel;
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

