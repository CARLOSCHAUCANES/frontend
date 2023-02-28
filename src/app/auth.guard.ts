import { Injectable,  } from '@angular/core';
import {  CanActivate, Resolve, Router} from '@angular/router';
import { map, Observable, Subscriber,of } from 'rxjs';
import { AuthService } from './services/auth.service';

interface Permission {
  url:string,
  profile:string;
};

@Injectable({
  providedIn: 'root'
})
  //let sProfile = JSON.parse(JSON.stringify(localStorage.getItem("user")));
  //let oProfile = JSON.parse(sProfile).profile;
  //this.router.navigate(['/signin']);
export class AuthGuard implements CanActivate {
    url:any; 
  constructor(private authService:AuthService,private router:Router){
    this.url = "";
  }
  canActivate():boolean {
    if(this.authService.loggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/signin']);
    }
    return false;
 }

 /*
 async verify(){
    let url = await this.verifyUrl();
    let permission = await this.verifyPermission(""+url);
    if(permission){
      return true;
    }
    else{
      return false;
    }
 }
 verifyUrl():Promise<string>{
  return new Promise((resolve,reject)=>{
    this.authService.getUrl().subscribe((event:any)=>{
      const rout = event['url']
      resolve(rout)
    })     
  })
 }

 verifyPermission(url:string):Promise<boolean>{
  return new Promise((resolve,reject)=>{
    this.authService.getPermission(url).subscribe(res=>{
      resolve(res);
    })
  })
 }
*/

}

