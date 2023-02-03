import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../../components/signup/signup.component'
import { SigninComponent } from '../../components/signin/signin.component';
import { TaskComponent } from '../../components/task/task.component';
import { PrivateTaskComponent } from '../../components/private-task/private-task.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ErrorControlComponent } from 'src/app/components/error-control/error-control.component';
import { NgzorroModule } from '../ngzorro/ngzorro.module';
@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    TaskComponent,
    PrivateTaskComponent,
    ErrorControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgzorroModule 
  ],
  exports:[
    SignupComponent,
    SigninComponent,
    TaskComponent,
    PrivateTaskComponent,
    ErrorControlComponent
  ]
})
export class UserModule { }