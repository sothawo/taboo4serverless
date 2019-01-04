import {Injectable} from "@angular/core";
import {LogListener} from "./log.listener";

@Injectable({
    providedIn: "root"
})
export class LogService {

    listeners: Set<LogListener> = new Set();

    constructor() {
    }

    debug(a: any) {
        this.dispatch(`DEBUG : ${a}`);
    }

    addListener(listener: LogListener) {
        this.listeners.add(listener);
    }

    removeListener(listener: LogListener) {
        this.listeners.delete(listener);
    }

    private dispatch(message: string) {
        console.log(message);
        this.listeners.forEach(listener => listener.add(message));
    }
}
