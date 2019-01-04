import {Injectable} from "@angular/core";

import {LogData, LogLevel, LogListener} from "./log-listener";

@Injectable({
    providedIn: "root"
})
export class LogService {

    listeners: Set<LogListener> = new Set();
    messages: LogData[] = [];

    constructor() {
        //add a console listener
        this.listeners.add(new class implements LogListener {
            log(logData: LogData) {
                console.log(logData.level, logData.data);
            }
        });
    }

    static format(o: any): string {
        let msg = "";
        if (typeof o === "string") {
            msg = o;
        } else {
            msg = JSON.stringify(o, null, 2);
        }
        return msg;
    };

    addListener(listener: LogListener) {
        this.listeners.add(listener);
    }

    removeListener(listener: LogListener) {
        this.listeners.delete(listener);
    }

    log(logData: LogData) {
        this.messages.push(logData);
        this.listeners.forEach(listener => listener.log(logData));
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
}
