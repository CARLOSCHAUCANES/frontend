import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ConfigConst } from 'src/app/config/config.const';
import { UserConst } from 'src/app/config/user.const'; 
import { FormBuilder,FormGroup,Validators,AbstractControl,FormControl,AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { ErrorControlComponent } from '../error-control/error-control.component';
import { Observable } from 'rxjs';
import { ValidationsService } from 'src/app/services/validations.service';
import { map, catchError,delay } from 'rxjs/operators';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ErrorService } from '../../services/error.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public errorEmail:string = "";
  public errorName:string = "";
  public errorPassword:string = "";
  public errorCedula:string= "";
  public errorLastName:string= "";
  public errorPhone:string = "";
  public errorConfirm:string = "";
  public errorAddress:string = "";
  public minLengthCedula = ConfigConst.MINLENGTHIDENTIFICATION;
  public maxLenghtCedula = ConfigConst.MAXLENGTHIDENTIFICATION;
  public activeCharging = false;

  public cedulaFormControl = new FormControl('', { 
    validators: [
      Validators.required,
      Validators.minLength(ConfigConst.MINLENGTHIDENTIFICATION),
      Validators.pattern(ConfigConst.REGULAREXPRESSION.IDENTIFICATIONONLYNUMBER)],
      asyncValidators:[this.uniqueCedulaValidator()]
    });

    public nameFormControl = new FormControl('',{
      validators:[Validators.required,Validators.pattern(ConfigConst.REGULAREXPRESSION.NAMESWITHSPACE)]
    });
    public lastNameFormControl = new FormControl('',{
      validators:[Validators.required,Validators.pattern(ConfigConst.REGULAREXPRESSION.NAMESWITHSPACE)]
    });

    public emailFormControl = new FormControl('', { 
    validators: [Validators.required, Validators.email],
    asyncValidators:[this.uniqueEmailValidator2()],
    updateOn: 'blur'//'blur'
    });
    public phoneFormControl = new FormControl('',{
      validators:[Validators.required,Validators.pattern(ConfigConst.REGULAREXPRESSION.STRINGONLYNUMBER)]
    });
  
  public passwordFormControl = new FormControl('',{
    validators:[Validators.required,Validators.minLength(ConfigConst.MINLENGTHPASSWORD)],
  });
  
  public confirmFormControl = new FormControl('',{
    validators:[Validators.required],
  });

  public addressFormControl = new FormControl('');


  signUpFormGroup = new FormGroup({
    cedula:this.cedulaFormControl,
    name:this.nameFormControl,
    lastName:this.lastNameFormControl,
    email: this.emailFormControl,
    phone:this.phoneFormControl,
    password:this.passwordFormControl,
    confirm:this.confirmFormControl,
    address:this.addressFormControl
  });
  constructor(
    private authService:AuthService,
    private router:Router,
    private notificacionService:NotificacionService,
    private fb: FormBuilder,
    private validations: ValidationsService,
    private errorService: ErrorService 
    ) {}
  ngOnInit(): void { }

  //load validation message
 validateFormSignUp(){
  if(!this.cedulaFormControl.valid){
    if(this.cedulaFormControl.errors?.['required']){
      this.errorCedula = ConfigConst.REQUIREDFIELD;
    }
    if(this.cedulaFormControl.errors?.['minlength']){
      this.errorCedula = ConfigConst.MESSAGEIDENTIFICATIONLENGTH;
    }
    if(this.cedulaFormControl.errors?.['pattern']){
      this.errorCedula = ConfigConst.DATASTRINGINCORRECT;
    }
    if(this.cedulaFormControl.errors?.['cedulaExists']){
      this.errorCedula = UserConst.CEDULAEXIST;
    }
    this.errorService.addError({"title":"cedula","content":this.errorCedula});
  }
  else{
    this.errorCedula = "";
  }
   //----------------------------------------------------
  if(!this.lastNameFormControl.valid){
    if(this.lastNameFormControl.errors?.['required']){
      this.errorLastName = ConfigConst.REQUIREDFIELD;
    }
    if(this.lastNameFormControl.errors?.['pattern']){
      this.errorLastName = ConfigConst.DATASTRINGINCORRECT;
    }
    this.errorService.addError({"title":"apellido","content":this.errorLastName});
  }
  else{
    this.errorLastName = "";
  }

  if(!this.emailFormControl.valid){
    if(this.emailFormControl.errors?.['required']){
      this.errorEmail =  ConfigConst.REQUIREDFIELD; 
    }
    if(this.emailFormControl.errors?.['emailExists']){
      this.errorEmail = UserConst.EMAILEXIST; 
    }
    if(this.emailFormControl.errors?.['email']){
      this.errorEmail = UserConst.INVALIDEDEMAIL; 
    }
    this.errorService.addError({"title":"nombre","content":this.errorName});
  }
  else{
    this.errorEmail = "";
  }
      if(!this.nameFormControl.valid)
      {
        if(this.nameFormControl.errors?.['required']){
          this.errorName = ConfigConst.REQUIREDFIELD;
        }
        if(this.nameFormControl.errors?.['pattern']){
          this.errorName = ConfigConst.DATASTRINGINCORRECT;
        }
      }
      else{
        this.errorName = "";
      }
      //------------------------------------------------------
      if(!this.passwordFormControl.valid){
        if(this.passwordFormControl.errors?.['required']){
          this.errorPassword = ConfigConst.REQUIREDFIELD;
        }
        if(this.passwordFormControl.errors?.['minlength']){
          this.errorPassword = UserConst.MINLENGTHPASSWORD;
        }
      }
      else
      {
        this.errorPassword = "";
      }
      //------------------------------------------------------
      if(!this.confirmFormControl.valid){
        if(this.confirmFormControl.errors?.['required']){
          this.errorConfirm = ConfigConst.REQUIREDFIELD;
        }
      }
      else
      {
        this.errorConfirm = "";
      }
      //------------------------------------------------------
      if(!this.phoneFormControl.valid){
        if(this.phoneFormControl.errors?.['required']){
          this.errorPhone = ConfigConst.REQUIREDFIELD;
        }
        if(this.phoneFormControl.errors?.['pattern']){
          this.errorPhone = ConfigConst.INVALIDDATA
        }
      }
      else
      {
        this.errorPhone = "";
      }          
 }
 //validators
 uniqueEmailValidator2():AsyncValidatorFn{
  return (control:AbstractControl):Observable<ValidationErrors | null> =>{
    return this.authService.checkEmail(control.value).pipe(
      map(exist=>(exist.response? {emailExists:true}:null))
    )
  }
}
uniqueCedulaValidator():AsyncValidatorFn{
  return (control:AbstractControl):Observable<ValidationErrors | null> =>{
    return this.authService.checkCedula(control.value).pipe(
      map(exist=>(exist.response? {cedulaExists:true}:null))
    )
  }
}
//functions crud
  signup(){
    this.activeCharging = true;
    if(!this.signUpFormGroup.valid){
      this.validateFormSignUp();
      this.activeCharging = false;
      return;
    }
    const datosUser = this.signUpFormGroup.getRawValue();
    if(datosUser.password != datosUser.confirm){
      this.notificacionService.createNotification1(
        ConfigConst.TYPENOTIFiCATION.WARNING,
        UserConst.NOTIFICATION.REGISTRO,
        UserConst.PASSWORDNOTSAME
      )
      this.activeCharging = false;
      return;
    }
      this.authService.signUp(datosUser)
      .subscribe(
        res=>{
          localStorage.setItem(ConfigConst.TOKEN,res.response.token);
          localStorage.setItem(ConfigConst.USER,JSON.stringify(res.response.user));
          this.router.navigate([ConfigConst.ROUTES.private]);
          this.notificacionService.createNotification1(
            ConfigConst.TYPENOTIFiCATION.SUCCESS,
            UserConst.NOTIFICATION.REGISTRO,
            res.message);
            this.activeCharging = false;
        },
        err=>{
          if(err.status >= ConfigConst.C400 && err.status <= ConfigConst.C499)
          {
            this.notificacionService.createNotification1(
              ConfigConst.TYPENOTIFiCATION.WARNING,
              UserConst.NOTIFICATION.REGISTRO,
              err.message)
          }
          else if(err.response.name == ConfigConst.VALIDATIONERROR)
          {
            this.notificacionService.createNotification1(
              ConfigConst.TYPENOTIFiCATION.WARNING,
              UserConst.NOTIFICATION.REGISTRO,
              ConfigConst.DATAINCORRECT)
          }else{
            this.notificacionService.createNotification1(
              ConfigConst.TYPENOTIFiCATION.ERROR,
              UserConst.NOTIFICATION.REGISTRO,
              err.message)
          }
          this.activeCharging = false;
        }
      );
  }
}


