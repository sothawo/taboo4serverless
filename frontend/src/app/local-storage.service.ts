import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private prefix = 'taboo4-';

    constructor() {
    }

    get(key: string, defaultValue: string = null): string {
        let value = window.localStorage.getItem(this.prefix + key);
        if (value == null && defaultValue != null) {
            window.localStorage.setItem(this.prefix + key, defaultValue);
            value = window.localStorage.getItem(this.prefix + key);
        }
        return value;
    }

    set(key: string, value: string) {
        if (value == null) {
            window.localStorage.removeItem(this.prefix + key);
        } else {
            window.localStorage.setItem(this.prefix + key, value);
        }
    }
}
