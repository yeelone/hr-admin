import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Group } from '../model/group';
import { MyService } from './service';

@Injectable({
  providedIn: 'root'
})
export class GroupService  extends MyService {
  private groupUrl = '/api/v1/group';
  constructor(private http: HttpClient) { super(); }

  getTopGroup(): Observable<Response[]> {
    let url = "/api/v1/group?where_key=parent&where_value=0";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  getGroupByParent(parent:string): Observable<Response[]> {
    let url = "/api/v1/group?where_key=parent&where_value=" + parent;
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  getGroups(): Observable<Response[]> {
    return this.http.get<Response[]>(this.groupUrl)
      .pipe(
        tap(response => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  getGroup(id:number): Observable<Response[]> {
    return this.http.get<Response[]>(this.groupUrl + "/" + String(id))
      .pipe(
        tap(response => this.log('fetched group')),
        catchError(this.handleError('getGroup', []))
      );
  }

  deleteGroup(id:number): Observable<Response[]> {
    let url = '/api/v1/group/' + String(id);

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('delete group' + String(id))),
        catchError(this.handleError('deleteGroup', []))
    );
  }

  createGroup(g:Group):Observable<Response[]>{
    let url = "/api/v1/group";
    return this.http.post<Response[]>(url,g)
      .pipe(
        tap(response => this.log('create group')),
        catchError(this.handleError('createGroup', []))
      );
  }


  updateGroup(g:Group):Observable<Response[]>{
    let url = "/api/v1/group/" + g.id;
    return this.http.put<Response[]>(url,g)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('updateGroup', []))
      );
  }

  lockGroup(id:number):Observable<Response[]>{
    let url = "/api/v1/group/"+id+"/lock";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('updateGroup', []))
      );
  }

  unlockGroup(id:number):Observable<Response[]>{
    let url = "/api/v1/group/"+id+"/unlock";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('updateGroup', []))
      );
  }
  invalidGroup(id:number):Observable<Response[]>{
    let url = "/api/v1/group/"+id+"/invalid";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('updateGroup', []))
      );
  }

  validGroup(id:number):Observable<Response[]>{
    let url = "/api/v1/group/"+id+"/valid";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('updateGroup', []))
      );
  }

  addGroupTagRelationship(group_id:number, tag_id_list:number[],rules:String[]):Observable<Response[]>{
    let url = "/api/v1/group/" + group_id + "/tags";
    let data = {
      group:group_id ,
      tags:tag_id_list,
      rules
      }
    return this.http.put<Response[]>(url,data)
      .pipe(
        tap(response => this.log('add relate group tags ')),
        catchError(this.handleError('addGroupTagRelationship', []))
      );
  }


}
