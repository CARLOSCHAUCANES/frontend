import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray,AbstractControl } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ConfigConst as CO} from 'src/app/config/config.const';
import { NgzorroModule } from 'src/app/modules/ngzorro/ngzorro.module';
import { PermissionConst as PC } from 'src/app/config/permission.const';

interface Profile{
  _id?:string;
  name?:string;
  description?:string;
  state?:string
}

interface Permission {
  _id?: string;
  route?: string;
  description?: string;
  profiles?: Profile[];
}

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {

  //to define variables modal
  isVisible = false;
  isOkLoading = false;
  titleModal = "";

  public profiles?:Profile[];
  public profilesSelected?:string[];
  //lista tabla
  listOfData: Permission[]=[];
  //forms controls by every field
  public routeFormControl = new FormControl('',{
    validators:[Validators.required]
  });
  public descriptionFormControl = new FormControl('',{
    validators:[Validators.required]
  });

  //forms
  public permissionformGroup = new FormGroup({
    route:this.routeFormControl,
    description:this.descriptionFormControl,
    profiles:new FormArray([])  
  });
  // test checkbox


  constructor(private authService:AuthService,private notification:NotificacionService) {
  }
  ngOnInit(): void {
    this.authService.getProfiles().subscribe(res=>{
      this.profiles = res.response;
    })
    this.authService.getListPermissions().subscribe(res=>{
      this.listOfData = res.response;
      console.log(this.listOfData);
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
    const formA = new FormArray([]);
    this.profilesSelected = this.permissionformGroup.get('profiles')?.value;
    let permission = {
      route:this.permissionformGroup.get('route')?.value,
      description:this.permissionformGroup.get('description')?.value,
      profiles:this.permissionformGroup.get('profiles')?.value
    }
    this.authService.savePermission(permission).subscribe(res=>{
      if(res.status = CO.C200){
        this.notification.createNotification1(CO.TYPENOTIFiCATION.SUCCESS,CO.NAMESNOTIFICACIONES.REGISTER,CO.REGISTERSUCCESS);
      }
      else
      {
        this.notification.createNotification1(CO.TYPENOTIFiCATION.ERROR,CO.NAMESNOTIFICACIONES.REGISTER,CO.REGISTERERROR);
      }
    })
    //this.permissionformGroup.get('profiles')?.value = this.profilesSelected;
  }

  //methods to handle a modal

  showModalSavePermission(){
    this.isVisible = true;
    this.titleModal = PC.MODAL.TITLEMODALREGISTER;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
 
}
