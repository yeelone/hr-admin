import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { MyService } from './service';
import { Role } from '../model/role';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RoleService extends MyService {

   constructor(private http: HttpClient) { super() }

  getRoles(offset:number,limit:number): Observable<Role[]> {
     let url = '/api/v1/role';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit) ;
    }
    return this.http.get<Role[]>(url)
      .pipe(
        tap(response => this.log('fetched roles list ')),
        catchError(this.handleError('getRoles', []))
    );
  }
}
