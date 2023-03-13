import { Component,ViewChild,Renderer2, ElementRef , OnInit, AfterViewInit, ViewChildren, QueryList, asNativeElements, } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl,FormControl,AsyncValidatorFn, ValidationErrors,FormArray} from '@angular/forms';
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
import { empty } from 'rxjs';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})

export  class AddPermissionComponent implements OnInit{
  @ViewChild('route') vRoute?: ElementRef;
  @ViewChildren('route') vRoutes?: QueryList<ElementRef<HTMLDivElement>>;
  //to define variables modal
  isVisible = false;
  isOkLoading = false;
  titleModal = "";
  activeCharging = true;
  isModalRegister:boolean =  false;;
  isModalUpdate:boolean = false;
  //lists
  public profiles?:Profile[];
  public profilesSelected?:string[];
  public listProfiles?:any[];
  public listOfData: Permission[]=[];
  //forms controls by every field
  public idFormControl = new FormControl('');

  public routeFormControl = new FormControl('',{
    validators:[Validators.required]
  });
  public descriptionFormControl = new FormControl('',{
    validators:[Validators.required]
  });
   profilesFormArray = new FormArray<any>([],[Validators.required]);
  //define forms
   permissionformGroup = new FormGroup({
    _id:this.idFormControl,
    route:this.routeFormControl,
    description:this.descriptionFormControl,
    profiles: this.profilesFormArray
  });
  //to call variables type @ViewChild
  
  constructor(private authService:AuthService,private notification:NotificacionService,elem:ElementRef,private render2:Renderer2,private fb: FormBuilder,) {
  }
  ngOnInit(): void {
    this.authService.getProfiles().subscribe(res=>{
      this.profiles = res.response;
    })
    
    this.getListPermissions();
  }

getListPermissions(){
  this.authService.getListPermissions().subscribe(res=>{
    this.listOfData = res.response;
  })
}

  onCheckChange(event:any) {
    const formArray: FormArray = this.permissionformGroup.get('profiles') as FormArray;
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else
    {
      // find the unselected element
      let i: number = 0;
      formArray.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
  savePermission(){
    if(!this.permissionformGroup.valid){
      //this.validateFormPermission();
      this.notification.createNotification1(CO.TYPENOTIFiCATION.WARNING,CO.NAMESNOTIFICACIONES.REGISTER,CO.DATAINCORRECT);
      this.isOkLoading = false;
      return;
    }
    const formA = new FormArray([]);
    this.profilesSelected = this.permissionformGroup.get('profiles')?.value;
    if(this.profilesSelected?.length == 0){
      this.notification.createNotification1(CO.TYPENOTIFiCATION.WARNING,CO.NAMESNOTIFICACIONES.REGISTER,PC.NoSELECTEDPROFILES);
      this.isOkLoading = false;
      return;
    }
    this.authService.savePermission(this.permissionformGroup.getRawValue()).subscribe(res=>{
      if(res.status = CO.C200){
        this.notification.createNotification1(CO.TYPENOTIFiCATION.SUCCESS,CO.NAMESNOTIFICACIONES.REGISTER,CO.REGISTERSUCCESS);
        this.getListPermissions();
        this.isVisible = false;
        this.isOkLoading = false;
      }
      else
      {
        this.notification.createNotification1(CO.TYPENOTIFiCATION.ERROR,CO.NAMESNOTIFICACIONES.REGISTER,CO.REGISTERERROR);
      }
    })
  }
  //update a permission
  updatePermission(){
    if(!this.permissionformGroup.valid){
      this.notification.createNotification1(CO.TYPENOTIFiCATION.WARNING,CO.NAMESNOTIFICACIONES.UPDATE,CO.DATAINCORRECT);
      this.isOkLoading = false;
      return;
    }
    this.authService.updatePermission(this.permissionformGroup.getRawValue()).subscribe(res=>{
      if(res.status = CO.C200){
        this.notification.createNotification1(CO.TYPENOTIFiCATION.SUCCESS,CO.NAMESNOTIFICACIONES.REGISTER,CO.REGISTERUPDATE);
        this.getListPermissions();
        this.isVisible = false;
        this.isOkLoading = false;
      }
      else
      {
        this.notification.createNotification1(CO.TYPENOTIFiCATION.ERROR,CO.NAMESNOTIFICACIONES.REGISTER,CO.REGISTERERROR);
      }
    })
  }
  //methods to handle a modal

  showModalSavePermission(){
    this.isModalRegister = true;
    this.isModalUpdate = false;
    this.isVisible = true;
    this.titleModal =PC.MODAL.TITLEMODALREGISTER;
    this.permissionformGroup.reset();
    this.listProfiles = [];
  }

  handleOk(): void {
    this.validateFormPermission();
    /*
    this.isOkLoading = true;
    if(this.isModalRegister)
    {
      this.savePermission();
    }
    else
    {
      const ele = this.vRoute?.nativeElement;
      const p = this.render2.createElement('p');
      for ( const ele  of this.vRoutes?.toArray()!) {
        const a = ele.nativeElement;
        console.log(a.getAttribute("name-control")?.valueOf(),a.getAttribute("type-control")?.valueOf());
        const p = this.render2.createElement('p');
        p.innerHTML = "hello world, i feel very happy";
        this.render2.appendChild(a,p);
        
      } */
      /*this.vRoutes?.forEach(ele=>{
        this.render2.appendChild(ele.nativeElement,p);
      })*/
      /*setTimeout(() => {
        this.updatePermission();
      }, 20000);*/
    //-------------------------------------------
    /*const p: HTMLParagraphElement = this.render2.createElement('p');
    p.innerHTML = "add new"
    this.render2.insertBefore(this.vRoute, p,true);
    //--------------------------------------------  
    }*/
    
  }

  handleCancel(): void {
    this.isVisible = false;
  }
 //methods to edit a permission
 permissionSelected(permission:Permission){
    this.isModalRegister = false;
    this.isModalUpdate = true;
    this.titleModal = PC.MODAL.TITLEMODALUPDATE;
    this.permissionformGroup.get("_id")?.setValue(""+permission._id);
    this.permissionformGroup.get("route")?.setValue(""+permission.route);
    this.permissionformGroup.get("description")?.setValue(""+permission.description);
    this.listProfiles = permission.profiles?.map(item=>item._id);
    this.isVisible = true;
 }




verifyChecked(profileId:any){
  return this.listProfiles?.includes(profileId);
}


deleteMessages(){
  const listNodes = document.querySelectorAll(".men");
  listNodes.forEach(n=>{
    n.remove();
  })
}

validateFormPermission(){
  this.deleteMessages();
  
const cforms = PC.FORMS;
cforms.forEach(form =>{
  if(form.name == "permissionformGroup"){
    const controls = form.controls;
    controls.forEach(control =>{
      const validators = control.validators;
      validators.forEach(validat=>{
        if(validat == 'required'){ 
           const mRequired = this.campoRequired(this.permissionformGroup.get(control.control));
           //--------------------------------------------------
            for ( const ele  of this.vRoutes?.toArray()!) {
              const a = ele.nativeElement;
              if(a.getAttribute("name-control")?.valueOf()==control.control){
                const p = this.render2.createElement('p');
                this.render2.setAttribute(p,"class","men");
                this.render2.setStyle(p,"color","red");
                this.render2.setStyle(p,"font-size",".7rem");
                this.render2.setStyle(p,"font-style","italic");
                p.innerHTML = mRequired;
                this.render2.appendChild(a,p);

              }

            }
           //--------------------------------------------------
        }
      })
    }) 
  }


});

}

 campoRequired(control:any):String{
  if(control.status as String === "INVALID"){
    if(control.errors.required){
      return "El campo es requerido";
    }
  }
   return "";
  }
}