import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { MyService } from './service';
import { Permission } from '../model/permission';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PermissionService extends MyService {

   constructor(private http: HttpClient) { super() }

  getPermission(rid:number ): Observable<Permission[]> {
    let url = "/api/v1/permission/role/" + String(rid)
    return this.http.get<Permission[]>(url)
      .pipe(
        tap(response => this.log('fetched permission list ')),
        catchError(this.handleError('getPermission', []))
    );
  }
  
  createPermission(role_name:string, fields:any ): Observable<Response[]> {
    let url = "/api/v1/permission"
    
    const data = {
      role_name,
      fields
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('fetched permission list ')),
        catchError(this.handleError('getPermission', []))
    );
  }
}
