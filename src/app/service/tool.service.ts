import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MyService } from './service';
import { BuildinFunc } from '../model/template';

@Injectable({
  providedIn: 'root'
})
export class ToolService  extends MyService {

  constructor(private http: HttpClient) { super() }

  getListFunc(): Observable<BuildinFunc[]> {
    let url = "/api/v1/tool/func";
    return this.http.get<BuildinFunc[]>(url)
      .pipe(
        tap(response => this.log('fetched buildin functions ')),
        catchError(this.handleError('getListFunc', []))
      );
  }


}
