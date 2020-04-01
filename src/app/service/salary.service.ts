import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { BaseSalary, QuerySalary, DownloadSalary, TaxConf, SalaryProfileConfig } from '../model/salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends MyService {

  constructor(private http: HttpClient) {super(); }

  saveBase(base: BaseSalary): Observable<Response[]> {
    const url = '/api/v1/salary/base/config';

    return this.http.post<Response[]>(url, base)
      .pipe(
        tap(response => this.log('save base salary')),
        catchError(this.handleError('saveBase', []))
    );
  }

  createProfileConfig(config: SalaryProfileConfig): Observable<Response[]> {
    const url = '/api/v1/salary/profile/config';

    return this.http.post<Response[]>(url, config)
      .pipe(
        tap(response => this.log('create profile config')),
        catchError(this.handleError('createProfileConfig', []))
    );
  }

  getProfileConfig(): Observable<Response[]> {
    const url = '/api/v1/salary/profile/config';

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('get profile config list')),
        catchError(this.handleError('getProfileConfig', []))
    );
  }

   deleteProfileConfig(id: number): Observable<Response[]> {
    const url = '/api/v1/salary/profile/config/' + String(id);

    return this.http.delete<Response[]>(url)
      .pipe(
        tap(response => this.log('delete profile config' + String(id))),
        catchError(this.handleError('deleteProfileConfig', []))
    );
  }

  getBase(): Observable<BaseSalary[]> {
    const url = '/api/v1/salary/base';

    return this.http.get<BaseSalary[]>(url)
      .pipe(
        tap(response => this.log('save base salary')),
        catchError(this.handleError('saveBase', []))
    );
  }

  calculate(body: any): Observable<Response[]> {
    const url = '/api/v1/salary/calculate';

    return this.http.post<Response[]>(url, body)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  export(body: QuerySalary): Observable<DownloadSalary[]> {
    let url = '/api/v1/salary/export?accountid=' + body.accountid + '&year=' + body.year + '&month=' + body.month;
    if ( body.template ) {
      url += '&template=' + body.template;
    }
    return this.http.get<DownloadSalary[]>(url)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  getTaxConf(): Observable<TaxConf[]> {
    const url = '/api/v1/salary/tax/config';

    return this.http.get<TaxConf[]>(url)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  setTaxConf(body: TaxConf): Observable<TaxConf[]> {
    const url = '/api/v1/salary/tax/config';
    return this.http.post<TaxConf[]>(url, body)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  getPreDeductionRateConf(): Observable<TaxConf[]> {
    const url = '/api/v1/salary/pre_deduction_rate/config';

    return this.http.get<TaxConf[]>(url)
      .pipe(
        tap(response => this.log('get pre_deduction_rate setting')),
        catchError(this.handleError('getPreDeductionRateConf', []))
    );
  }

  getProfileSalaryByYearAndMonth(profile: number, year: string, month: string): Observable<Response[]> {
    const url = '/api/v1/salary/year/' + year + '/month/' + month + '/profile/' + profile;

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('getProfileSalary detail')),
        catchError(this.handleError('getProfileSalary', []))
    );
  }

  setPreDeductionRateConf(body: TaxConf): Observable<TaxConf[]> {
    const url = '/api/v1/salary/pre_deduction_rate/config';

    return this.http.post<TaxConf[]>(url, body)
      .pipe(
        tap(response => this.log('pre_deduction_rate setting')),
        catchError(this.handleError('setPreDeductionRateConf', []))
    );
  }
}
