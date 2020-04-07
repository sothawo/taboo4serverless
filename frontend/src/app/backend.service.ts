import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from './settings/config';
import {LogService} from './log/log.service';
import {Bookmark} from './data/bookmark';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private logger: LogService, private http: HttpClient, private localStorageService: LocalStorageService) {
    }

    config(): Observable<Config> {
        const url = `${this.localStorageService.get('apiUrl')}/config`;
        const options = this.httpOptions();
        this.preCallLogging(url, 'GET', options);
        return this.http.get<Config>(url, options);
    }

    allTags(): Observable<string[]> {
        const url = `${this.localStorageService.get('apiUrl')}/tags`;
        const options = this.httpOptions();
        this.preCallLogging(url, 'GET', options);
        return this.http.get<string[]>(url, options);
    }

    bookmarksByTags(tags: string[]): Observable<Bookmark[]> {
        const url = `${this.localStorageService.get('apiUrl')}/bookmarks/query`;
        const body = {'tags': tags};
        const options = this.httpOptions();
        this.preCallLogging(url, 'POST', options, body);
        return this.http.post<Bookmark[]>(url, body, options);
    }

    deleteBookmark(id: string): Observable<string> {
        const url = `${this.localStorageService.get('apiUrl')}/bookmark/${id}`;
        const options = this.httpOptions();
        this.preCallLogging(url, 'DELETE', options);
        return this.http.delete<string>(url, options);
    }

    saveBookmark(bookmark: Bookmark): Observable<Bookmark> {
        const url = `${this.localStorageService.get('apiUrl')}/bookmark`;
        const body = bookmark;
        const options = this.httpOptions({previousId: bookmark.id});
        this.preCallLogging(url, 'POST', options, body);
        return this.http.post<Bookmark>(url, body, options);
    }

    loadTitle(titleUrl: string): Observable<string> {
        const url = `${this.localStorageService.get('apiUrl')}/title`;
        const body = {'url': titleUrl};
        const options = this.httpOptions();
        this.preCallLogging(url, 'POST', options, body);
        return this.http.post<string>(url, body, options);
    }

    private httpOptions(params: any = null) {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Api-Key': this.localStorageService.get('apiKey')
        });

        const httpParams = new HttpParams({fromObject: params});
        return {
            headers: httpHeaders,
            params: httpParams
        };
    }

    private preCallLogging(url: string, method: string, options, payload: any = null) {
        this.logger.info(`${method} to ${url}`);
        this.logger.debug(options);
        if (payload) {
            this.logger.debug(payload);
        }
    }
}
