import { Component,ViewChild,Renderer2, ElementRef , OnInit, AfterViewInit, ViewChildren, QueryList, asNativeElements, } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl,FormControl,AsyncValidatorFn,ValidatorFn ,ValidationErrors,FormArray} from '@angular/forms';
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
import { Observable,map, observable} from 'rxjs';
import { ValidationsService } from 'src/app/services/validations.service';
import { switchMap,mergeMap } from 'rxjs';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})

export  class AddPermissionComponent implements OnInit{
  @ViewChild('route') vRoute?: ElementRef;
  @ViewChildren('profilesChecked') vProfilesChecked?:ElementRef;
  @ViewChildren('route') vRoutes?: QueryList<ElementRef<HTMLDivElement>>;
  //to define variables modal
  isVisible = false;
  isOkLoading = false;
  titleModal = "";
  activeCharging = true;
  isModalRegister:boolean =  false;;
  isModalUpdate:boolean = false;
  permissionSelected1?:Permission;
  //lists
  public profiles?:Profile[];
  public profilesSelected?:string[];
  public listProfiles?:any[];
  public listOfData: Permission[]=[];
  //forms controls by every field
  public idFormControl = new FormControl('');

  public routeFormControl = new FormControl('',{
    validators:[this.validate.validateCharacterNumberLine()],
    asyncValidators:[this.uniqueNameRoute()],
    updateOn: 'blur'
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
  
  constructor(private authService:AuthService,private notification:NotificacionService,elem:ElementRef,private render2:Renderer2,private fb: FormBuilder,private validate:ValidationsService) {
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

  onCheckChange(event:any){
    const formArray: FormArray = this.permissionformGroup.get('profiles') as FormArray;
    if(event.target.checked){/* Selected */
      formArray.push(new FormControl(event.target.value));// Add a new control in the arrayForm
    }
    else/* unselected */
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
    console.log(this.permissionformGroup);
    if(this.isModalRegister){
      this.savePermission();
    }
    else{
      this.updatePermission();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
 //methods to edit a permission
 permissionSelected(permission:Permission){
    this.permissionSelected1 = permission;
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

  if(this.listProfiles?.includes(profileId))
  {
     return true;
  }
  else
  {
    return false;
  }
}

loadProfilesSelected(){
  const formArray: FormArray = this.permissionformGroup.get("profiles") as FormArray;
  formArray.clear();
  this.listProfiles?.forEach(item=>{
    formArray.push(new FormControl(item));
  })
  console.log(this.permissionformGroup.get("profiles"));
}

validateFormPermission(){
  this.validate.validateForm(this.permissionformGroup,this.vRoutes!,"permissionformGroup",this.render2);
}

uniqueNameRoute():AsyncValidatorFn{
  return (control:AbstractControl):Observable<ValidationErrors | null> =>{
    return this.authService.getPermissionByNameRoute(control.value).pipe(
      map((exist:any)=>(
        this.validateNameRoute(exist.response)?{routeExists:true}:null
        ))
    )
  }
}

validateNameRoute(objeRoute:any):boolean{
  if(objeRoute)
  {
    if(this.isModalUpdate){
      if(this.permissionSelected1?.route == objeRoute.route){
        return false;
      }
      else
      {
        return true;
      }
    }
    else{
      return true;
    }
  }
  else{
    return false;
  }
  
}


}