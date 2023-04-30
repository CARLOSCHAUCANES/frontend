import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  private totalRequests = 0;
  constructor(private authService:AuthService,private loaderService:LoaderService) { } 
   intercept(req:any,next:any){
    this.totalRequests++;
    this.loaderService.setLoading(true);
    const tokenizeReq = req.clone({
        setHeaders:{
          Authorization:`Beaner ${this.authService.getToken()}`
        }
      });
      return next.handle(tokenizeReq).pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests == 0) {
            this.loaderService.setLoading(false);
          }
        })
      );
  }
}
