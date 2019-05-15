import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { UserGroup } from '../model/usergroup';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { Role } from '../model/role';
@Injectable({
  providedIn: 'root'
})
export class UserService extends MyService{

   constructor(private http: HttpClient) {super() }

  getUsers(offset:number,limit:number): Observable<User[]> {
    let url = '/api/v1/user';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<User[]>(url)
      .pipe(
        tap(response => this.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
    );
  }

  searchUsers(key:string,value:string, offset:number,limit:number): Observable<User[]> {
    let url = '/api/v1/user';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit)+"&key="+key+"&value=" + value;
    }

    console.log(url)
    return this.http.get<User[]>(url)
      .pipe(
        tap(response => this.log('search users')),
        catchError(this.handleError('searchUsers', []))
    );
  }

  deleteUser(id:number): Observable<Response[]> {
    let url = '/api/v1/user/' + String(id);

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('delete user' + String(id))),
        catchError(this.handleError('deleteUser', []))
    );
  }
  createUser(body:User): Observable<Response[]> {
    let url = '/api/v1/user';

    return this.http.post<Response[]>(url,body)
      .pipe(
        tap(response => this.log('delete users')),
        catchError(this.handleError('deleteProfile', []))
    );
  }

  updateUser(u:User):Observable<Response[]>{
    let url = "/api/v1/user/" + u.id;
    return this.http.put<Response[]>(url,u)
      .pipe(
        tap(response => this.log('update user ')),
        catchError(this.handleError('updateUser', []))
      );
  }

  getUsersByGroup(id:number,offset:number,limit:number): Observable<User[]> {
    let url = "/api/v1/usergroup/"+String(id)+"/users";

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<User[]>(url)
      .pipe(
        tap(response => this.log('fetched users by group id ' + String(id))),
        catchError(this.handleError('getUsersByGroup', []))
      );
  }

  addUsersToGroup(g:UserGroup,user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/usergroup/" + g.id + "/users";
    let data = {
      id:g.id,
      user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('add relate profile')),
        catchError(this.handleError('addusersToGroup', []))
      );
  }

  removeUsersToGroup(g:UserGroup,user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/usergroup/" + g.id + "/users/remove";
    let data = {
      id:g.id,
      user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('remove users of group')),
        catchError(this.handleError('removeUsersToGroup', []))
      );
  }

   freezeUsers(user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/user/freeze";
    let data = {
      users:user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('freeze users ')),
        catchError(this.handleError('freezeUsers', []))
      );
  }
  
  activeUsers(user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/user/active";
    let data = {
      users:user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('active users')),
        catchError(this.handleError('activeUsers', []))
      );
  }

  resetPassword(user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/user/password/reset";
    let data = {
      users:user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('reset users password ')),
        catchError(this.handleError('resetPassword', []))
      );
  }

  changePassword(id:number, password:string):Observable<Response[]>{
    let url = "/api/v1/user/password/change";
    let data = {
      id, 
      password
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('change users password ')),
        catchError(this.handleError('changePassword', []))
      );
  }


  getUsersByRole(id:number,offset:number,limit:number): Observable<User[]> {
    let url = "/api/v1/role/"+String(id)+"/users";

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<User[]>(url)
      .pipe(
        tap(response => this.log('fetched users by role id ' + String(id))),
        catchError(this.handleError('getUsersByRole', []))
      );
  }

  addUsersToRole(r:Role,user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/role/" + r.id + "/users";
    let data = {
      id:r.id,
      user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('add relate users to role')),
        catchError(this.handleError('addUsersToRole', []))
      );
  }

  removeUsersToRole(r:Role,user_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/role/" + r.id + "/users/remove";
    let data = {
      id:r.id,
      user_id_list
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('remove users of role')),
        catchError(this.handleError('removeUsersToRole', []))
      );
  }


}
