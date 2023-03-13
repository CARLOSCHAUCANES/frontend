import { Injectable } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl,FormControl,AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { Observable, of } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  constructor() {}
  validateNamePerson(name1:string):any{
    let expReg = "/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/gm";
    let re = RegExp(expReg);
    let res = re.exec(name1);
    if(res){
        return true;
    }
    return false;
  }

  validateForm(form:FormGroup){

  }
  


}

