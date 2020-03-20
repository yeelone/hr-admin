import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { MessageCount } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService  extends MyService {

  constructor(private http: HttpClient) { super(); }

  getCount(id: number): Observable<MessageCount[]> {
    const url = '/api/v1/message/user/' + id + '/unread/count';
    return this.http.get<MessageCount[]>(url)
      .pipe(
        tap(response => this.log('fetched message count')),
        catchError(this.handleError('getCount', []))
      );
  }

  getMessages(id: number, offset: number, limit: number, status: string): Observable<Response[]> {
    let url = '/api/v1/message/user/' + id ;

    if ( limit ) {
      url += '?offset=' + String(offset) + '&limit=' + String(limit);
    }
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched messages')),
        catchError(this.handleError('getMessages', []))
    );
  }

  setStatus(id: number): Observable<Response[]> {
    const url = '/api/v1/message/status' ;
    const data = {
      msgIds: [id],
      status: 1,
    };

    return this.http.put<Response[]>(url, data)
      .pipe(
        tap(response => this.log('fetched messages')),
        catchError(this.handleError('getMessages', []))
    );
  }
}
