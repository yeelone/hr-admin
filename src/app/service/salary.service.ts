import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { BaseSalary,QuerySalary,DownloadSalary,TaxConf } from '../model/salary';

@Injectable({
  providedIn: 'root'
})
export class SalaryService extends MyService {

  constructor(private http: HttpClient) {super() }

  saveBase(base:BaseSalary): Observable<Response[]> {
    let url = '/api/v1/salary/base/config';

    return this.http.post<Response[]>(url,base)
      .pipe(
        tap(response => this.log('save base salary')),
        catchError(this.handleError('saveBase', []))
    );
  }

  getBase(): Observable<BaseSalary[]> {
    let url = '/api/v1/salary/base';

    return this.http.get<BaseSalary[]>(url)
      .pipe(
        tap(response => this.log('save base salary')),
        catchError(this.handleError('saveBase', []))
    );
  }

  calculate(body:any): Observable<Response[]> {
    let url = '/api/v1/salary/calculate';

    return this.http.post<Response[]>(url,body)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  export(body:QuerySalary): Observable<DownloadSalary[]> {
    let url = '/api/v1/salary/export?accountid=' + body.accountid + "&year=" + body.year + "&month=" + body.month;
    if ( body.template ){
      url += "&template=" + body.template
    }
    return this.http.get<DownloadSalary[]>(url)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  getTaxConf(): Observable<TaxConf[]> {
    let url = '/api/v1/salary/tax/config';
    
    return this.http.get<TaxConf[]>(url)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  setTaxConf(body:TaxConf): Observable<TaxConf[]> {
    let url = '/api/v1/salary/tax/config';
    
    return this.http.post<TaxConf[]>(url, body)
      .pipe(
        tap(response => this.log('calculate salary')),
        catchError(this.handleError('calculate', []))
    );
  }

  getPreDeductionRateConf(): Observable<TaxConf[]> {
    let url = '/api/v1/salary/pre_deduction_rate/config';
    
    return this.http.get<TaxConf[]>(url)
      .pipe(
        tap(response => this.log('get pre_deduction_rate setting')),
        catchError(this.handleError('getPreDeductionRateConf', []))
    );
  }

  getProfileSalaryByYearAndMonth(profile:number, year:string,month:string): Observable<Response[]> {
    let url = '/api/v1/salary/year/'+year+'/month/'+month+'/profile/'+profile;
    
    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('getProfileSalary detail')),
        catchError(this.handleError('getProfileSalary', []))
    );
  }

  setPreDeductionRateConf(body:TaxConf): Observable<TaxConf[]> {
    let url = '/api/v1/salary/pre_deduction_rate/config';
    
    return this.http.post<TaxConf[]>(url, body)
      .pipe(
        tap(response => this.log('pre_deduction_rate setting')),
        catchError(this.handleError('setPreDeductionRateConf', []))
    );
  }
}
