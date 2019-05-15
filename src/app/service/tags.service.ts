import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { Tag } from '../model/tag';
@Injectable({
  providedIn: 'root'
})
export class TagsService extends MyService {
  
  constructor(private http: HttpClient) { super() }

  getTags(): Observable<Response[]> {
    let url = "/api/v1/tag"
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched tags')),
        catchError(this.handleError('getTags', []))
      );
  }

  getTopTags(): Observable<Response[]> {
    let url = "/api/v1/tag?where_key=parent&where_value=0";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched top tags')),
        catchError(this.handleError('getTopTags', []))
      );
  }

  getChildTags(id:number): Observable<Tag[]> {
    let url = "/api/v1/tag/" + String(id) + "/child";
    return this.http.get<Tag[]>(url)
      .pipe(
        tap(response => this.log('fetched top tags')),
        catchError(this.handleError('getTopTags', []))
      );
  }

  deleteTag(id:number): Observable<Response[]> {
    let url = '/api/v1/tag/' + String(id);

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('delete tag' + String(id))),
        catchError(this.handleError('deleteTag', []))
    );
  }

  createTag(tag:Tag): Observable<Response[]> {
    let url = '/api/v1/tag';

    return this.http.post<Response[]>(url,tag)
      .pipe(
        tap(response => this.log('create new tag')),
        catchError(this.handleError('createTag', []))
    );
  }

  updateTag(id:number,tag:Tag): Observable<Response[]> {
    let url = '/api/v1/tag/' + String(id);

    return this.http.put<Response[]>(url,tag)
      .pipe(
        tap(response => this.log('update  tag')),
        catchError(this.handleError('updateTag', []))
    );
  }
}
