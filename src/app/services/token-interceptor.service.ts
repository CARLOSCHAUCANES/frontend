import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
//import { HttpClient,HttpHeaders,HttpParamsOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { } 
   intercept(req:any,next:any){
    const tokenizeReq = req.clone({
        setHeaders:{
          Authorization:`Beaner ${this.authService.getToken()}`
        }
      });
      return next.handle(tokenizeReq);
  }
}
