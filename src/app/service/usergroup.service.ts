import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserGroup } from '../model/usergroup';
import { MyService } from './service';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService extends MyService {

  constructor(private http: HttpClient) { super() }

  getTopUserGroups(offset:number,limit:number): Observable<Response[]> {
     let url =  "/api/v1/usergroup?where_key=parent&where_value=0";

    if ( limit ){
      url += "&offset="+String(offset)+"&limit="+String(limit);
    }

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched user groups')),
        catchError(this.handleError('getTopUserGroups', []))
      );
  }
  
  getUserGroupByParent(parent:string): Observable<Response[]> {
    let url = "/api/v1/usergroup?where_key=parent&where_value=" + parent;
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched groups')),
        catchError(this.handleError('getUserGroupByParent', []))
      );
  }

  getUserGroups(offset:number,limit:number): Observable<Response[]> {
    let url = '/api/v1/usergroup';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  deleteUserGroup(id:number): Observable<Response[]> {
    let url = '/api/v1/usergroup/' + String(id);

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('delete user group' + String(id))),
        catchError(this.handleError('deleteUserGroup', []))
    );
  }

  createUserGroup(g:UserGroup):Observable<Response[]>{
    let url = "/api/v1/usergroup";
    return this.http.post<Response[]>(url,g)
      .pipe(
        tap(response => this.log('create user group')),
        catchError(this.handleError('createUserGroup', []))
      );
  }


  updateUserGroup(g:UserGroup):Observable<Response[]>{
    let url = "/api/v1/usergroup/" + g.id;
    return this.http.put<Response[]>(url,g)
      .pipe(
        tap(response => this.log('update user group')),
        catchError(this.handleError('updateUserGroup', []))
      );
  }

}
