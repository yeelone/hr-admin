import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
import { StatisticsQuery } from '../model/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends MyService {

  constructor(private http: HttpClient) {super(); }

  getAnnual(year: string , profile: number[], department: number[]): Observable<Response[]> {
    let url = '/api/v1/statistics/annual_income/employee?year=' + year ;
    if ( profile && profile.length > 0 ) {
      url += '&profiles=' + profile.join(',');
    }

    if ( department && department.length > 0 ) {
      url += '&departments=' + department.join(',');
    }

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('get annual  salary')),
        catchError(this.handleError('getAnnual', []))
    );
  }
  getDetail(salary: StatisticsQuery ): Observable<Response[]> {
    const url = '/api/v1/statistics/query/detail' ;

    const data = {
      account: +salary.account,
      templates: salary.templates,
      year: salary.year
    };

    return this.http.post<Response[]>(url, data )
      .pipe(
        tap(response => this.log('get detail  salary')),
        catchError(this.handleError('getDetail', []))
    );
  }

  getDepartmentIncome(salary: StatisticsQuery ): Observable<Response[]> {
    const url = '/api/v1/statistics/query/department/income' ;

    const data = {
      account: +salary.account,
      templates: salary.templates,
      year: salary.year
    };

    return this.http.post<Response[]>(url, data )
      .pipe(
        tap(response => this.log('get detail  salary')),
        catchError(this.handleError('getDetail', []))
    );
  }

  getTransferRecord(): Observable<Response[]> {
    const url = '/api/v1/record/transfer' ;

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('get transfer record')),
        catchError(this.handleError('getTransferRecord', []))
    );
  }

  getProfileIncreaseMonth(amount: number): Observable<Response[]> {
    const url = '/api/v1/statistics/profile/increase' ;

    const data = {
      getYear: false,
      getMonth: true,
      getDay: false,
      amount: amount
    };

    return this.http.post<Response[]>(url, data)
      .pipe(
        tap(response => this.log('get profile increase')),
        catchError(this.handleError('getProfileIncreaseMonth', []))
    );
  }

  getProfileIncreaseYear(amount: number): Observable<Response[]> {
    const url = '/api/v1/statistics/profile/increase' ;

    const data = {
      getYear: true,
      getMonth: false,
      getDay: false,
      amount: amount
    };

    return this.http.post<Response[]>(url, data)
      .pipe(
        tap(response => this.log('get profile increase')),
        catchError(this.handleError('getProfileIncreaseYear', []))
    );
  }

  getProfileIncreaseDay(amount: number): Observable<Response[]> {
    const url = '/api/v1/statistics/profile/increase' ;

    const data = {
      getYear: false,
      getMonth: false,
      getDay: true,
      amount: amount
    };

    return this.http.post<Response[]>(url, data)
      .pipe(
        tap(response => this.log('get profile increase')),
        catchError(this.handleError('getProfileIncreaseDay', []))
    );
  }


}
