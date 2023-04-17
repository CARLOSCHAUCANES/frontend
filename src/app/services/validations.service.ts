import {Injectable,Renderer2, ElementRef , QueryList } from '@angular/core';
import { FormGroup,AbstractControl,ValidatorFn, ValidationErrors} from '@angular/forms';
import { PermissionConst as PC } from 'src/app/config/permission.const';
import { ConfigConst as CC } from '../config/config.const';
@Injectable({
  providedIn: 'root'
})
export class ValidationsService  {
//main function
//iterate for every validator
  validateForm(formValidate:FormGroup,routes:QueryList<ElementRef<HTMLDivElement>>,nameFormGroup:String,render2:Renderer2){
    this.deleteMessages();
    let message = "";
      let contrls = Object.keys(formValidate.controls);
      contrls.forEach(nameControl=>{
      const ctrl = formValidate.get(nameControl);
      message = this.assignMessage(ctrl);
      this.renderHtml(routes,nameControl,render2,message+"");
      });
  }
//assign messahe every control 
assignMessage(ctrl:any){
    let message:any = "";
    if(ctrl.errors?.hasOwnProperty(CC.VALIDATORS.CHARACTERSNUMBERSLINE.name))message = CC.VALIDATORS.CHARACTERSNUMBERSLINE.message;
    if(ctrl.errors?.hasOwnProperty(CC.VALIDATORS.REQUIRED.name))message = CC.VALIDATORS.REQUIRED.message; 
    if(ctrl.errors?.hasOwnProperty(CC.VALIDATORS.MINLENGTH.name))message =CC.VALIDATORS.MINLENGTH.message+" "+ctrl.errorrs.minlength.requiredLength +" "+CC.VALIDATORS.MINLENGTH.other;
    if(ctrl.errors?.hasOwnProperty(CC.VALIDATORS.MAXLENGTH.name))message = CC.VALIDATORS.MAXLENGTH.message+" "+ ctrl.errors.maxlength.quantityMax + " "+CC.VALIDATORS.MAXLENGTH.other; 
    if(ctrl.errors?.hasOwnProperty(CC.VALIDATORS.ROUTEEXISTS.name))message = CC.VALIDATORS.ROUTEEXISTS.message;
    return message; 
}

  //main function
  //delete the nodes with the class of the (men)
  deleteMessages(){
    const listNodes = document.querySelectorAll(".error-message-form");
    listNodes.forEach(n=>{
      n.remove();
    })
  }
  //main function
  //write in the view the html content
  renderHtml(routes:QueryList<ElementRef<HTMLDivElement>>,nameControl:string,render2:Renderer2,message:string){
    for ( const ele  of routes?.toArray()!)
    {
      const a = ele.nativeElement;
      if(a.getAttribute("name-control")?.valueOf()==nameControl && message !='')
      {
        const p = render2.createElement('p');
        render2.setAttribute(p,"class","error-message-form");
        render2.setStyle(p,"color","red");
        render2.setStyle(p,"font-size",".7rem");
        p.innerHTML = message;
        render2.appendChild(a,p);
      }

    }
  }
//validator
//name=>(maxlength) 
validateMaximumLength(quantityMax:number):ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
    console.log(control);
    let res = true;
    if(!(control?.value.length  > quantityMax)){
      res = false;
    }
    return res?{maxlength:
      {
        value:control?.value ,
        quantityCharacteres:control.value.length,
        quantityMax
      }
    }:null
  }
}
//validator string nombre23-tes8t
//name=>(nameCharacterNumberScript) 
VALIDATORcharactersNumbersLine():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
    let nameRe = "^[a-zA-Z]+[a-zA-Z0-9-]+$";
    const nameRe1 = new RegExp(nameRe);
    const valid = nameRe1.test(control.value);
    return !valid ? {charactersNumbersLine: {value: control.value}} : null;
  }
}


}

