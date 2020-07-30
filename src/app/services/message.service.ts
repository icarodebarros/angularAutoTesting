// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

@Injectable()
export class MessageService {

    constructor(
        // http: HttpClient
    ) {}

    getContent(): Observable<string> {
        // return this.http.get<string>(`...`);
        return of(null)
            .pipe(
                mapTo('You have been warned!'),
                delay(600)
            );
    }
}
