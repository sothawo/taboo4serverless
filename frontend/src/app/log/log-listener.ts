export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
}

export class LogData {
    level: LogLevel;
    data: any;

    constructor(level: LogLevel, data: any) {
        this.level = level;
        this.data = data;
    }
}
export interface LogListener {
    log(data: LogData);
}

