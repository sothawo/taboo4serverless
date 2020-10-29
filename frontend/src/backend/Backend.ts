import {Observable, of} from 'rxjs';
import {fromFetch} from 'rxjs/fetch';
import {mergeMap, switchMap} from 'rxjs/operators';

interface IpApi {
    query: string
}

export class Backend {

    getIp = (): Observable<string> => {
        const responseObservable = fromFetch('http://ip-api.com/json');
        const observable = responseObservable.pipe<any, IpApi, string>(
            mergeMap(response => response.json()),
            mergeMap(foo => of((foo as IpApi))),
            mergeMap(ipApi => of(ipApi.query))
        );
        return observable;
    };
}
