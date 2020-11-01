import {Observable, of} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {mergeMap} from 'rxjs/operators';
import {LocalStorage} from '../localstorage/LocalStorage';
import {Logger} from '../logs/Logger';
import {Bookmark} from '../bookmarks/Bookmark';

interface IpApi {
    query: string
}

export class Backend {

    constructor(private localStorage: LocalStorage, private logger: Logger) {
    }

    // todo remove
    getIp(): Observable<string> {
        return fromFetch('http://ip-api.com/json').pipe<any, IpApi, string>(
            mergeMap(response => response.json()),
            mergeMap(foo => of((foo as IpApi))),
            mergeMap(ipApi => of(ipApi.query))
        );
    };

    allTags(): Observable<string[]> {
        return fromFetch(this.buildRequest('GET', '/tags'))
            .pipe(mergeMap(response => response.json()));
    }

    bookmarksByTags(tags: string[]): Observable<Bookmark[]> {
        return fromFetch(this.buildRequest('POST', '/bookmarks/query', {tags}))
            .pipe(mergeMap(response => response.json()));
    }

    saveBookmark(bookmark: Bookmark): Observable<Bookmark> {
        const params = (bookmark.id && `?previousId=${bookmark.id}`) || undefined
        const path = params ? `/bookmark${params}` : '/bookmark';
        return fromFetch(this.buildRequest('POST', path, bookmark))
            .pipe<any, Bookmark, Bookmark>(
                mergeMap(response => response.json()),
                mergeMap( it => of((it as Bookmark))),
                // create a real Bookmark object
                mergeMap( it => of(new Bookmark(it.id, it.url, it.title, it.tags)))
            )
    }

    loadTitle(url: string): Observable<string>{
        return fromFetch(this.buildRequest('POST', '/title', {url}))
            .pipe(mergeMap(response => response.json()));
    }

    private buildRequest(method: string, path: string, body: any = undefined): Request {
        let payload = body && JSON.stringify(body);
        const request: Request = new Request(
            `${this.localStorage.get('apiUrl')}${path}`,
            {
                method: method,
                headers: this.getHeaders(),
                body: payload
            });
        this.logRequest(request, payload);
        return request;
    }

    private getHeaders(): Headers {
        return new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Api-Key': `${this.localStorage.get('apiKey')}`
        });
    }

    private logRequest(request: Request, payload?: string) {

        this.logger.info(`-> ${request.method} ${request.url}`);
        request.headers.forEach((v, k) => {
            this.logger.debug(`-> ${k}: ${v}`);
        });

        if (payload) {
            this.logger.debug("-> data:")
            this.logger.debug(JSON.parse(payload));
        }
    }
}
