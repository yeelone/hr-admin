import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { SalaryTemplateAccount } from '../model/salary';

@Injectable({
  providedIn: 'root'
})
export class TemplateaccountService extends MyService {

  constructor(private http: HttpClient) { super(); }

  get(id: number): Observable<SalaryTemplateAccount[]> {
    const url = '/api/v1/salary/account/' + id ;

    return this.http.get<SalaryTemplateAccount[]>(url)
      .pipe(
        tap(response => this.log('fetched template account with fields')),
        catchError(this.handleError('get', []))
    );
  }

  save(body: SalaryTemplateAccount): Observable<Response[]> {
    const url = '/api/v1/salary/account';
    let data = {};
    data['id'] = body.id;
    data['name'] = body.name;
    data['order'] = body.order;
    data['templates'] = [];
    data['groups'] = [];

    for (let i = 0; i < body.templates.length ; i++) {
      data['templates'].push(body.templates[i].id);
    }

    for (let i = 0; i < body.groups.length ; i++) {
      data['groups'].push(body.groups[i].id);
    }

    return this.http.post<Response[]>(url, data)
      .pipe(
        tap(response => this.log('create template account')),
        catchError(this.handleError('create', []))
    );
  }

  list(): Observable<SalaryTemplateAccount[]> {
    const url = '/api/v1/salary/account';

    return this.http.get<SalaryTemplateAccount[]>(url)
      .pipe(
        tap(response => this.log('fetch salary template account list')),
        catchError(this.handleError('list', []))
    );
  }

  delete(id: number): Observable<Response[]>{
    const url = '/api/v1/salary/account/' + id;

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('fetch salary template account ')),
        catchError(this.handleError('delete ', []))
    );
  }

  listAllTemplateFields(id: number): Observable<SalaryTemplateAccount[]> {
    const url = '/api/v1/templateaccount/' + id + '/templates';

    return this.http.get<SalaryTemplateAccount[]>(url)
      .pipe(
        tap(response => this.log('fetch fields of the salary template account  ')),
        catchError(this.handleError('listAllTemplateFields ', []))
    );
  }

  getAllFieldByYear(id: number, year: string): Observable<Response[]> {
    const url = '/api/v1/salary/account/' + id + '/year/' + year + '/fields';

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('fetch fields of the salary template account  ')),
        catchError(this.handleError('getAllFieldByYear ', []))
    );
  }
}
