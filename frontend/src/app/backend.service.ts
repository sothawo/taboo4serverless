import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorage} from "ngx-store";
import {Config} from "./settings/config";
import {LogService} from "./log/log.service";

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

    config(): Observable<Config> {
        const url = `${this.apiUrl}/config`;
        this.preCallLogging(url);
        return this.http.get<Config>(url, this.httpOptions());
    }

    allTags(): Observable<string[]> {
        const url = `${this.apiUrl}/tags`;
        this.preCallLogging(url);
        return this.http.get<string[]>(url, this.httpOptions());
    }

    private preCallLogging(url: string) {
        this.logger.info(`backend call to ${url}`);
        this.logger.debug(`api key: ${this.apiKey}`);
    }
}
