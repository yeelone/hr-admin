import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService  extends MyService {

  constructor(private http: HttpClient) { super(); }

  getSummary(): Observable<Response[]> {
    const url = '/api/summary';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetched summary data')),
        catchError(this.handleError('getSummary', []))
      );
  }
}