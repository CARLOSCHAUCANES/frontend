import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoutesResolver implements Resolve<Observable<any>> {
  constructor(private authService:AuthService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    delay(3000);
    return of("hello my love");
  }
}
