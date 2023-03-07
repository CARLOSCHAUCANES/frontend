import { Component,ViewChild,Renderer2, ElementRef , OnInit, AfterViewInit, } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray,AbstractControl } from '@angular/forms';
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

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})

export  class AddPermissionComponent implements OnInit{
  @ViewChild('route') vRoute?: ElementRef;
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
  public routeFormControl = new FormControl('',{
    validators:[Validators.required]
  });
  public descriptionFormControl = new FormControl('',{
    validators:[Validators.required]
  });
  //define forms
  public permissionformGroup = new FormGroup({
    _id:new FormControl(''),
    route:this.routeFormControl,
    description:this.descriptionFormControl,
    profiles:new FormArray<any>([])  
  });
  //to call variables type @ViewChild
  
  constructor(private authService:AuthService,private notification:NotificacionService,elem:ElementRef,private render2:Renderer2) {
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
    this.isOkLoading = true;
    if(this.isModalRegister){
      this.savePermission();
    }
    else{
      const ele = this.vRoute?.nativeElement;
      console.log(ele);
      const p = this.render2.createElement('p');
      p.innerHTML = "hello dear world";
      this.render2.setStyle(ele,"background-color","red");
      this.render2.appendChild(ele,p);
 
      setTimeout(() => {
        this.updatePermission();
      }, 20000);
    //-------------------------------------------
    /*const p: HTMLParagraphElement = this.render2.createElement('p');
    p.innerHTML = "add new"
    this.render2.insertBefore(this.vRoute, p,true);*/
    //--------------------------------------------
      
    }
    
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

 ngAfterViewInit(){
  
 }


verifyChecked(profileId:any){
  return this.listProfiles?.includes(profileId);
}

}
