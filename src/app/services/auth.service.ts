import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,NavigationEnd,Event,NavigationStart } from '@angular/router';
import { map, catchError,delay } from 'rxjs/operators';
import { Observable, of,Subject,Subscription } from 'rxjs'; 
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidationsService } from './validations.service';
import { filter } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';

interface Permission {
  url?:string,
  profile?:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private URL = "http://localhost:3000/api";
  private url?:string;
  private per?:boolean;
  public observePermission:Observable<Permission> = of({});
  constructor(
    private http:HttpClient,
    private router:Router,
    private encrypt:EncryptionService,
    private validations:ValidationsService
             ) { 
              this.url = "";
              this.per = false;
             }
  signUp(user:any){
    return this.http.post<any>(this.URL+'/signup',user);
  }
  checkEmail(email:any):Observable<any>{
    return this.http.post<any>(this.URL+'/checkEmail',{email});
  }
  checkCedula(cedula:any):Observable<any>{
    return this.http.post<any>(this.URL+'/checkCedula',{cedula})
  }
  signin(user:any){
    return this.http.post<any>(this.URL+'/signin',user);
  }
  loggedIn():boolean{ 
    return !!(localStorage.getItem("token") && localStorage.getItem("user"));
  }
  checkAuthorization():Observable<any>{
    return this.http.get<any>(this.URL+'/check-authorization');
  }

  logged():boolean{
    
    return true;
  }
  getToken(){
    return localStorage.getItem("token");
  }
  getUser(){
    const dataUserJson = localStorage.getItem("user");
    return JSON.parse(""+dataUserJson+"");
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    this.router.navigate(['/signin']);
  }
  
  saveUser(user:any){
    return this.http.post<any>(this.URL+"/signup",user);
  }

  getListUser(){
    return this.http.get<any>(this.URL+'/list-users');
  }
   getUrl():Promise<string>{
    return new Promise(resolve=>{
        this.router.events.
        pipe(filter(event=>event instanceof NavigationEnd)).subscribe((event:any)=>{
          resolve(event['url']);
        });
    }) 
  
   }

   getPermission(url:string):Observable<boolean>{
    let sProfile = JSON.parse(JSON.stringify(localStorage.getItem("user")));
    let oProfile = JSON.parse(sProfile).profile;
    return this.http.post<any>(this.URL+'/getPermissionByNameRouteProfile',{route:url,profile:oProfile}).pipe(
      map(res =>res.response?true:false)
    );
   }

 getPerm():boolean{
  return this.per?true:false;
 }

   getProfiles():Observable<any>{
      return this.http.get<any>(this.URL+'/listActiveprofiles');
   }

   savePermission(permission:any){
    return this.http.post<any>(this.URL+'/savePermission',permission);
  }

  updatePermission(permission:any){
    return this.http.post<any>(this.URL+'/updatePermission',permission);
  }
   
   getListPermissions(){
    return this.http.get<any>(this.URL+'/getListPermissions');
   }

   getPermissionByNameRoute(route:any){
    return this.http.post<any>(this.URL+'/getPermissionByNameRoute',{route});
   }

}
