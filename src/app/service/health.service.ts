import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';

@Injectable({
  providedIn: 'root'
})
export class HealthService  extends MyService {

  constructor(private http: HttpClient) { super() }

  getHealth(): Observable<Response[]> {
    const url = '/api/sd/health';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched health data')),
        catchError(this.handleError('getHealth', []))
      );
  }

  getDisk(): Observable<Response[]> {
    const url = '/api/sd/disk';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched disk data')),
        catchError(this.handleError('getDisk', []))
      );
  }

  getCPU(): Observable<Response[]> {
    const url = '/api/sd/cpu';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched cpu data')),
        catchError(this.handleError('getCPU', []))
      );
  }

  getRAM(): Observable<Response[]> {
    const url = '/api/sd/ram';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched ram data')),
        catchError(this.handleError('getRAM', []))
      );
  }

}