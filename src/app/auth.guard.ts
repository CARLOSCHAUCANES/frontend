import { Injectable,  } from '@angular/core';
import {  CanActivate, Resolve,Route, Router} from '@angular/router';
import { map, Observable, Subscriber,of,delay ,from} from 'rxjs';
import { AuthService } from './services/auth.service';
import { ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

interface Permission {
  url:string,
  profile:string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    url:any;
    permission:any; 
   constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Observable<boolean>{
    //console.log(route.url[0].path);
   if(this.authService.loggedIn())
    {
       return this.authService.getPermission(route.url[0].path);       
    }
    else
    {
      this.router.navigate(['/signin']);
    }
    return of(false);
 }


 
 

 


 verifyPermission(route:string):Promise<boolean>{
  return new Promise((resolve,reject)=>{
    this.authService.getPermission(route).subscribe(permission=>{
      if(permission){
        resolve(true);
      }
      else{
        resolve(false);
      }
    })
  });
}


}

