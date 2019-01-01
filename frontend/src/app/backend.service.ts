import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorage} from "ngx-store";
import {Config} from "./settings/config";
import {LogService} from "./log.service";

@Injectable({
    providedIn: "root"
})
export class BackendService {
    @LocalStorage()
    apiUrl: string;

    @LocalStorage()
    apiKey: string;

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "X-Api-Key": this.apiKey
        })
    };

    constructor(private log: LogService, private http: HttpClient) {
    }

    config(): Observable<Config> {
        const url = `${this.apiUrl}/config`;
        this.log.debug(url);
        return this.http.get<Config>(url, this.httpOptions);
    }

}
