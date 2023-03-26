import {Injectable, Component,ViewChild,Renderer2, ElementRef , OnInit, AfterViewInit, ViewChildren, QueryList, asNativeElements, } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl,FormControl,AsyncValidatorFn,ValidatorFn, ValidationErrors,FormArray} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ConfigConst as CO} from 'src/app/config/config.const';
import { NgzorroModule } from 'src/app/modules/ngzorro/ngzorro.module';
import { PermissionConst as PC } from 'src/app/config/permission.const';
import { ConfigConst as CC } from 'src/app/config/config.const';
import { style } from '@angular/animations';
import { Profile } from 'src/app/interfaces/Profile';
import { Permission } from 'src/app/interfaces/Permission';
import { Observable,map,pipe, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService  {
//main function
//iterate for every validator
  validateForm(formValidate:FormGroup,routes:QueryList<ElementRef<HTMLDivElement>>,nameFormGroup:String,render2:Renderer2){
  this.deleteMessages();
  const cforms = PC.FORMS;
  cforms.forEach(form =>{
    if(form.name == nameFormGroup){
      const controls = form.controls;
      controls.forEach(control =>{
        const validators = control.validators;
        let message:any= "";
        validators.forEach(validat=>{
          if(validat == 'required'){ 
             message +=this.messageRequired(formValidate.get(control.control));
          }
          if(validat == 'minlength'){ 
            message +=this.messageMinimumLength(formValidate.get(control.control));
         }
         if(validat == 'maxlength'){ 
            message +=this.messageMiximumLength(formValidate.get(control.control));
         }
         if(validat == 'charactersNumbersLine'){
            message +=this.messageCharacterNumberLine(formValidate.get(control.control));
         }
         if(validat == 'routeExists'){
          message +=this.messageRouteExists(formValidate.get(control.control));
         }
        })
        this.renderHtml(routes,control.control,render2,message+"");
      })   
    }
  });
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
      if(a.getAttribute("name-control")?.valueOf()==nameControl){
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
validateCharacterNumberLine():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
    let nameRe = "^[a-zA-Z]+[a-zA-Z0-9-]+$";
    const nameRe1 = new RegExp(nameRe);
    const valid = nameRe1.test(control.value);
    return !valid ? {charactersNumbersLine: {value: control.value}} : null;
  }
}

//response message 
//required field 
messageCharacterNumberLine(control:any):String{
  if(control.status as String === "INVALID")
  {
    console.log(control.errors);
    if(control.errors.charactersNumbersLine){
      return "El campo solo permite letras al inicio, y conbinaciones entre números y el simbolo (-)";
    }
  }
  return "";
}

//response message 
//required field 
messageRequired(control:any):String{
      if(control.status as String === "INVALID")
      {
        if(control.errors.required){
          return "El campo es requerido";
        }
      }
      return "";
}

//response message 
//minimun length field 
messageMinimumLength(control:any):String{
    if(control.status as String === "INVALID")
    {
      if(control.errors.minlength){
        const minl = control.errors.minlength;
        return "No cumple la longitud de "+minl.requiredLength +" caracteres";
      }
    }
    return "";
  }
  //response message 
  //maximum length field 
messageMiximumLength(control:any):String{
    console.log(control);
    if(control.status as String === "INVALID")
    {
      console.log(control.errors);
      if(control.errors.maxlength){
        const maxl = control.errors.maxlength;
        return "Solo es permitodo máximo "+ maxl.quantityMax + " caracteres";
      }
    }
    return "";
  }
  //response message 
  //to verify if the route's name already it is save
messageRouteExists(control:any):String{
  if(control.status as String === "INVALID")
  {
    console.log(control.errors);
    if(control.errors.routeExists){
      return "El nombre de la ruta ya existe";
    }
  }
  return "";
}
}

