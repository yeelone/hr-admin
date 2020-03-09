import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { MyService } from './service';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Captcha } from '../model/captcha';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService extends MyService {

  constructor(private http: HttpClient, private router: Router) { super(); }

  genCaptcha(): Observable<Captcha[]> {
    const url = '/api/captcha/';
    return this.http.get<Captcha[]>(url)
      .pipe(
        catchError(this.handleError('genCaptcha', []))
    );
  }

  varifyCaptcha(captchaId: string, value: string ): Observable<string[]> {
    const url = '/api/captcha/varify/' + captchaId + '/' + value;
    return this.http.get<string[]>(url)
      .pipe(
        catchError(this.handleError('varifyCaptcha', []))
    );
  }
}
