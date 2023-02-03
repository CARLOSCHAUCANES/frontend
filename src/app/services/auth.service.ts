import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError,delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; 
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidationsService } from './validations.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = "http://localhost:3000/api";

  constructor(
    private http:HttpClient,
    private router:Router,
    private validations:ValidationsService
             ) { }
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
  getListUser(){
    return this.http.get<any>(this.URL+'/list-users');
  }
  
}
