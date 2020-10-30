import {Observable, of} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {mergeMap} from 'rxjs/operators';
import {LocalStorage} from '../localstorage/LocalStorage';
import {Logger} from '../logs/Logger';

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

    private buildRequest(method: string, path: string): Request {
        const request: Request = new Request(
            `${this.localStorage.get('apiUrl')}${path}`,
            {
                method: method,
                headers: this.getHeaders()
            });
        this.preCallLogging(request);
        return request;
    }

    private getHeaders(): Headers {
        return new Headers({
            'Accept': 'application/json',
            'X-Api-Key': `${this.localStorage.get('apiKey')}`
        });
    }

    private preCallLogging(request: Request) {

        this.logger.info(`-> ${request.method} ${request.url}`);
        request.headers.forEach((v, k) => {
            this.logger.debug(`-> ${k}: ${v}`);
        });

        if (request.body) {
            this.logger.debug(request.body);
        }
    }
}
