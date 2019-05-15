import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { MyService } from './service';
import { Permission } from '../model/permission';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BackupService extends MyService {

  constructor(private http: HttpClient) { super() }

  backup(): Observable<Response[]> {
    let url = "/api/v1/tool/backup"
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('request backup service ')),
        catchError(this.handleError('backup', []))
    );
  }

  list(): Observable<Response[]> {
    let url = "/api/v1/tool/backup/files"
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('request backup service ')),
        catchError(this.handleError('backup', []))
    );
  }
  
}
