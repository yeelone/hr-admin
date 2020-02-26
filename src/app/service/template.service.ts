import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { SalaryTemplate } from '../model/salary';

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends MyService {

  constructor(private http: HttpClient) {super();}

  get(id: number): Observable<SalaryTemplate[]> {
    const url = '/api/v1/salary/template/' + id;

    return this.http.get<SalaryTemplate[]>(url)
      .pipe(
        tap(response => this.log('fetched template with fields')),
        catchError(this.handleError('get', []))
    );
  }

  getAuditing(id: string): Observable<SalaryTemplate[]> {
    const url = '/api/v1/salary/template/' + id + '/audit';

    return this.http.get<SalaryTemplate[]>(url)
      .pipe(
        tap(response => this.log('fetched template with fields')),
        catchError(this.handleError('get', []))
    );
  }

  create(body: SalaryTemplate): Observable<Response[]> {
    const url = '/api/v1/salary/template/config';

    return this.http.post<Response[]>(url,body)
      .pipe(
        tap(response => this.log('create base salary template')),
        catchError(this.handleError('createTemplate', []))
    );
  }

  list(): Observable<SalaryTemplate[]> {
    const url = '/api/v1/salary/template';

    return this.http.get<SalaryTemplate[]>(url)
      .pipe(
        tap(response => this.log('fetch salary template list')),
        catchError(this.handleError('list', []))
    );
  }

  listAccountTemplate(id:number): Observable<SalaryTemplate[]>{
    const url = '/api/v1/salary/account/' + id + '/template';

    return this.http.get<SalaryTemplate[]>(url)
      .pipe(
        tap(response => this.log('fetch salary template list by account id ')),
        catchError(this.handleError('list', []))
    );
  }

  delete(id: number): Observable<Response[]> {
    const url = '/api/v1/salary/template/' + id;

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('fetch salary template list')),
        catchError(this.handleError('list', []))
    );
  }

  updateOrders(orders: {}): Observable<Response[]> {
    const url = '/api/v1/salary/template/order';

    return this.http.post<Response[]>(url, {orders})
      .pipe(
        tap(response => this.log('update template orders ')),
        catchError(this.handleError('updateOrders', []))
    );
  }

}
