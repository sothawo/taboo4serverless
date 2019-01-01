import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

    debug(a: any) {
        console.log(a);
    }
}
