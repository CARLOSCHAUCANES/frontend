import { Component, Renderer2, ElementRef,OnInit,ViewChildren,QueryList } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import {AuthService} from './../../services/auth.service'
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/User';
import { Profile} from 'src/app/interfaces/Profile';
import { EncryptionService } from 'src/app/services/encryption.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ConfigConst as CC } from 'src/app/config/config.const';
import { UserConst as  UC } from 'src/app/config/user.const';
import { ValidationsService } from 'src/app/services/validations.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit {
  //variables html
  @ViewChildren('route') vRoutes?: QueryList<ElementRef<HTMLDivElement>>;
  //modal variables
  isVisible = false;
  isOkLoading = false;
  titleModal = "";
  activeCharging = true;
  isModalRegister:boolean =  false;;
  isModalUpdate:boolean = false;

  public proSelected:boolean = false;
  //variables object
  public userSelected?:User;
  //list variables
  public listProfiles:Profile[] = [];
  public listOfData: User[] = [];
  //form variables
  public cedulaFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public nameFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public lastNameFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public emailFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public phoneFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public addressFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public passwordFormControl = new FormControl("",{
    validators:[Validators.required]
  });
  public profileFormControl = new FormControl("",{
    validators:[Validators.required]
  });

  public userformGroup = new FormGroup({
    cedula:this.cedulaFormControl,
    name:this.nameFormControl,
    lastName:this.lastNameFormControl,
    email:this.emailFormControl,
    phone:this.phoneFormControl,
    address:this.addressFormControl,
    password:this.passwordFormControl,
    profile:this.profileFormControl,
    confirm:new FormControl("")
  });
  
   
  constructor(
    private authService:AuthService,
    private fb: FormBuilder,
    private encrypt:EncryptionService,
    private notification:NotificacionService,
    private validate:ValidationsService,
    elem:ElementRef,
    private render2:Renderer2,) { }
  

  ngOnInit(): void {
    this.getListUsers();
    this.getListProfiles();
  }
  getListUsers()
  {
      this.authService.getListUser().subscribe(
      res=>{
        this.listOfData=res.response;
      },
      err=>{
        const res = JSON.parse(JSON.stringify(err));
      }
    )
  }
  getListProfiles(){
    this.authService.getProfiles().subscribe(res=>{
      this.listProfiles = res.response;
    },
    err=>{
      console.log(err);
    }
    )
  }

//functions
handleOk(){
  this.saveUser();

}
handleCancel(): void {
  this.isVisible = false;
}

showModalNewUser()
{
  this.userformGroup.reset();
  this.titleModal = "REGISTRO DE USUARIO";
  this.isVisible = true;
}

saveUser(){
  if(!this.userformGroup.valid){
    this.validateFormUser();
    return;
  }
  const user = this.userformGroup.getRawValue();
  let passwordEncry = this.encrypt.encryptText(this.userformGroup.get("password")?.value+"");
  user.password = passwordEncry;
  this.authService.saveUser(this.userformGroup.getRawValue()).subscribe(res=>{
    if(res.status >= CC.CODES.C200 && res.status <=CC.CODES.C299){
      this.notification.createNotification1(CC.TYPE_NOTIFiCATION.success,UC.TITLE_NOTIFICATION.registerUser,UC.MESSAGE_NOTIFICATION_USER.success);
    }
    else if(res.status >= CC.CODES.C300 && res.status <=CC.CODES.C399){
      this.notification.createNotification1(CC.TYPE_NOTIFiCATION.warning,UC.TITLE_NOTIFICATION.registerUser,UC.MESSAGE_NOTIFICATION_USER.warning);
    }
    else{
      this.notification.createNotification1(CC.TYPE_NOTIFiCATION.error,UC.TITLE_NOTIFICATION.registerUser,UC.MESSAGE_NOTIFICATION_USER.error);
    }
  },
  error=>{
    this.notification.createNotification1(CC.TYPE_NOTIFiCATION.error,UC.TITLE_NOTIFICATION.registerUser,UC.MESSAGE_NOTIFICATION_USER.error);

  }

  )
  ;
}

validateFormUser(){
  this.validate.validateForm(this.userformGroup,this.vRoutes!,UC.FORM.name,this.render2);
}



showModalEditUser(user:User){
  this.userSelected = user;
  this.selectProfile();
  this.titleModal = "ACTUALIZAR USUARIO";
  this.isVisible = true;
  //full the form
  const pro:Profile = JSON.parse(JSON.stringify(user.profile));
  this.userformGroup.get("cedula")?.setValue(user.cedula+"");
  this.userformGroup.get("profile")?.setValue(pro._id+"");
  this.userformGroup.get("name")?.setValue(user.name+"");
  this.userformGroup.get("lastName")?.setValue(user.lastName+"");
  this.userformGroup.get("email")?.setValue(user.email+"");
  this.userformGroup.get("phone")?.setValue(user.phone+"");
  this.userformGroup.get("address")?.setValue(user.address+"");
  let text = "carlos";
  let textEncry = this.encrypt.encryptText(text);
  console.log("this is the text encrypt",textEncry);
  let textDesenc = this.encrypt.desencrypText(textEncry);
  console.log("this is the text textDesencrypt=>",textDesenc);
  this.userformGroup.get("password")?.setValue(user.password+"");
  this.userformGroup.get("confirm")?.setValue(user.password+"");
  //this.userformGroup.get("profile")?.setValue()
}

selectProfile(){
  const pro:Profile = JSON.parse(JSON.stringify(this.userSelected?.profile));
  for(let  pr of this.listProfiles){
    if(pr._id === pro._id){
      pr.state = true;
    }
    else{
      pr.state = false;
    }
    
  }
}

}
