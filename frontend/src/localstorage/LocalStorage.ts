export class LocalStorage {

    private prefix = 'taboo4-react-';

    get(key: string, defaultValue: string | null = null): string | null {
        let value = window.localStorage.getItem(this.prefix + key);
        if (value == null && defaultValue != null) {
            window.localStorage.setItem(this.prefix + key, defaultValue);
            value = window.localStorage.getItem(this.prefix + key);
        }
        return value;
    }

    set(key: string, value: string) {
        return (value == null)
            ? window.localStorage.removeItem(this.prefix + key)
            : window.localStorage.setItem(this.prefix + key, value);

    }
}
