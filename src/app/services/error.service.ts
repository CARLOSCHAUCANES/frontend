import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Error{
  title?:string,
  content?:string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errores:Error[] = [];
  private errores$:Subject<Error[]>;
  constructor() { 
    this.errores$ = new Subject();
  }
  addError(err:Error){
    this.errores.push(err);
    this.errores$.next(this.errores);
  }

  getErrores$():Observable<Error[]>{
    return this.errores$.asObservable();
  }
}
