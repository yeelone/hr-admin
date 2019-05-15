import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { Import } from '../model/import'; 

@Injectable({
  providedIn: 'root'
})
export class UploadService  extends MyService {

  constructor(private http: HttpClient) { super() }

  upload(formData:any): Observable<Response[]> {

    let url = "/api/v1/import/profile";

    return this.http.post<Response[]>(url,formData)
      .pipe(
        tap(response => this.log('upload profile data')),
        catchError(this.handleError('upload', []))
      );
  }

  uploadSalary(formData:any): Observable<Response[]> {

    let url = "/api/v1/import/salary";

    return this.http.post<Response[]>(url,formData)
      .pipe(
        tap(response => this.log('uploading salary template ')),
        catchError(this.handleError('uploadSalary', []))
      );
  }
  
  uploadTags(formData:any): Observable<Import[]> {

    let url = "/api/v1/import/tag";

    return this.http.post<Import[]>(url,formData)
      .pipe(
        tap(response => this.log('upload tag data')),
        catchError(this.handleError('uploadTags', []))
      );
  }

  uploadGroups(formData:any): Observable<Import[]> {

    let url = "/api/v1/import/group";

    return this.http.post<Import[]>(url,formData)
      .pipe(
        tap(response => this.log('upload group data')),
        catchError(this.handleError('uploadGroup', []))
      );
  }

  uploadGroupTags(formData:any): Observable<Import[]> {

    let url = "/api/v1/import/group/tags";

    return this.http.post<Import[]>(url,formData)
      .pipe(
        tap(response => this.log('upload group tags relationship data')),
        catchError(this.handleError('uploadGroupTags', []))
      );
  }
}
