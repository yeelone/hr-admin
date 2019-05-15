import { Injectable } from '@angular/core';
import config from '../config/config';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators';

const baseurl = config.baseurl;

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req, next: HttpHandler) {

    let newReq = req.clone({
      url: req.hadBaseurl ? `${req.url}` : `${baseurl}${req.url}`,
    });
    /*此处设置额外的头部，token常用于登陆令牌*/
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        newReq.headers = newReq.headers.set('Authorization',`Bearer ${currentUser.token}`);
    }

    // if(!req.cancelToken) {
    //   /*token数据来源自己设置，我常用localStorage存取相关数据*/
    //   newReq.headers =
    //   newReq.headers.set('token', 'my-new-auth-token')
    // }

    if ( req.url.indexOf( "/import/" ) ){
      // newReq.headers = newReq.headers.set('Content-Type','multipart/form-data; charset=utf-8; boundary="wdfasfwd2fh3aaaccvaef-"');
    }else{
      newReq.headers = newReq.headers.set('Content-Type','application/json');
    }
   
    newReq.headers = newReq.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-TOKEN') ;

    // send cloned request with header to the next handler.
    return next.handle(newReq)
      .pipe(
        /*失败时重试2次，可自由设置*/
        retry(2),
        /*捕获响应错误，可根据需要自行改写，我偷懒了，直接用的官方的*/
        catchError(this.handleError)
      )
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error);
      if ( error.status === 401 ){
        alert("无权进行此操作");
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.statusText}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
