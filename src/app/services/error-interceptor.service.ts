import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable,throwError } from 'rxjs';
import { ConfigConst as conf } from '../config/config.const';
import { ResponseServe as Response } from '../config/response.serve';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError(this.handleError)
      )
  }
  handleError(error:HttpErrorResponse){
    if(error.status == conf.CERO){
      const res = new Response(conf.MESSAGEERRORSERVER,{},conf.C501);
      return throwError(res.getResponse());
    }
    return throwError(error.error)
  }
}
