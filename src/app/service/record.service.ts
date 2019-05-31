import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { MyService } from './service';
import { Record } from '../model/record';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RecordService extends MyService{

  constructor(private http: HttpClient) { super() }

  getRecords(date:string , offset:number,limit:number): Observable<Record[]> {
    let url = '/api/v1/record/list';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit) +"&date="+ date;
    }
    return this.http.get<Record[]>(url)
      .pipe(
        tap(response => this.log('fetched audit list ')),
        catchError(this.handleError('getAudits', []))
    );
  }

  getOperationRecords(offset:number,limit:number): Observable<Record[]> {
    let url = '/api/v1/record/operation';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<Record[]>(url)
      .pipe(
        tap(response => this.log('fetched operate list ')),
        catchError(this.handleError('getOperationRecords', []))
    );
  }

}
