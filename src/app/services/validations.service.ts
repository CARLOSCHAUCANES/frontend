import {Injectable,Renderer2, ElementRef , QueryList } from '@angular/core';
import { FormGroup,AbstractControl,ValidatorFn, ValidationErrors} from '@angular/forms';
import { PermissionConst as PC } from 'src/app/config/permission.const';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService  {
//main function
//iterate for every validator
  validateForm(formValidate:FormGroup,routes:QueryList<ElementRef<HTMLDivElement>>,nameFormGroup:String,render2:Renderer2){
  console.log(formValidate);
  this.deleteMessages();
  const cforms = PC.FORMS;
  cforms.forEach(form =>{
    if(form.name == nameFormGroup){
      const controls = form.controls;
      let message = "";
      controls.forEach(control =>{
      const ctrl = formValidate.get(control.control);
       message = this.assignMessage(ctrl);
       this.renderHtml(routes,control.control,render2,message+"");
      })   
    }
  });
  }

assignMessage(ctrl:any){
    let message:any = "";
    if(ctrl.errors?.hasOwnProperty('charactersNumbersLine'))message = "Minimmo 2 caracteres, El campo solo permite letras al inicio, conbinaciones alfanuméricas y el simbolo (-)";
    if(ctrl.errors?.hasOwnProperty('required'))message = "El campo es requerido"; 
    if(ctrl.errors?.hasOwnProperty('minlength'))message = "No cumple la longitud de "+ctrl.errorrs.minlength.requiredLength +" caracteres";
    if(ctrl.errors?.hasOwnProperty('maxlength'))message = "Solo es permitodo máximo "+ ctrl.errors.maxlength.quantityMax + " caracteres"; 
    if(ctrl.errors?.hasOwnProperty('routeExists'))message = "El nombre de la ruta ya existe";
    return message; 
}

  //main function
  //delete the nodes with the class of the (men)
  deleteMessages(){
    const listNodes = document.querySelectorAll(".men");
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
      if(a.getAttribute("name-control")?.valueOf()==nameControl && message !=''){
        const p = render2.createElement('p');
        render2.setAttribute(p,"class","men");
        render2.setStyle(p,"color","red");
        render2.setStyle(p,"font-size",".7rem");
        render2.setStyle(p,"font-style","italic");
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

