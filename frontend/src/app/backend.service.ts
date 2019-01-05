import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorage} from "ngx-store";
import {Config} from "./settings/config";
import {LogService} from "./log/log.service";
import {Bookmark} from "./data/bookmark";

@Injectable({
    providedIn: "root"
})
export class BackendService {
    @LocalStorage()
    apiUrl: string = "";

    @LocalStorage()
    apiKey: string = "";

    constructor(private logger: LogService, private http: HttpClient) {
    }

    private httpOptions() {
        return {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "X-Api-Key": this.apiKey
            })
        }
    };

    private preCallLogging(url: string, method: string, payload: any = null) {
        this.logger.info(`${method} to ${url}`);
        this.logger.debug(`api key: ${this.apiKey}`);
        if (payload) {
            this.logger.debug(payload)
        }
    }

    config(): Observable<Config> {
        const url = `${this.apiUrl}/config`;
        this.preCallLogging(url, "GET");
        return this.http.get<Config>(url, this.httpOptions());
    }

    allTags(): Observable<string[]> {
        const url = `${this.apiUrl}/tags`;
        this.preCallLogging(url, "GET");
        return this.http.get<string[]>(url, this.httpOptions());
    }

    bookmarksByTags(tags: string[]): Observable<Bookmark[]> {
        const url = `${this.apiUrl}/bookmarks/query`;
        const body = {"tags": tags};
        this.preCallLogging(url, "POST", body);
        return this.http.post<Bookmark[]>(url, body, this.httpOptions());
    }
}
