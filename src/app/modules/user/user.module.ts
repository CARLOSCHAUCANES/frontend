import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../../components/signup/signup.component'
import { SigninComponent } from '../../components/signin/signin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ErrorControlComponent } from 'src/app/components/error-control/error-control.component';
import { NgzorroModule } from '../ngzorro/ngzorro.module';
import { MaterialModule } from '../material/material.module';
import { AddPermissionComponent } from 'src/app/components/add-permission/add-permission.component';
@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ErrorControlComponent,
    AddPermissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgzorroModule,
    MaterialModule
  ],
  exports:[
    SignupComponent,
    SigninComponent,
    ErrorControlComponent
  ]
})
export class UserModule { }