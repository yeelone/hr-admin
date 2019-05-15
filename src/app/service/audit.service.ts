import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { MyService } from './service';
import { Audit } from '../model/audit';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuditService  extends MyService {

  constructor(private http: HttpClient) { super() }

  getAudits(state:number , offset:number,limit:number): Observable<Audit[]> {
    let url = '/api/v1/audit/list';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit) +"&state="+String(state);
    }
    return this.http.get<Audit[]>(url)
      .pipe(
        tap(response => this.log('fetched audit list ')),
        catchError(this.handleError('getAudits', []))
    );
  }

  updateState(audit:Audit): Observable<Response[]> {
    let url = '/api/v1/audit/' + String(audit.id);
   
    audit.state = +audit.state;
    return this.http.post<Response[]>(url, audit)
      .pipe(
        tap(response => this.log('update audit state ')),
        catchError(this.handleError('updateState', []))
    );
  }


}
