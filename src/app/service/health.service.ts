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
    let url = "/api/sd/health";
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched health data')),
        catchError(this.handleError('getHealth', []))
      );
  }
}