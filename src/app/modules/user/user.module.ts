import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from '../../components/signin/signin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ErrorControlComponent } from 'src/app/components/error-control/error-control.component';
import { NgzorroModule } from '../ngzorro/ngzorro.module';
import { MaterialModule } from '../material/material.module';
import { AddPermissionComponent } from 'src/app/components/add-permission/add-permission.component';
import { AppComponent } from 'src/app/app.component';
import { ListUsersComponent } from 'src/app/components/list-users/list-users.component';
@NgModule({
  declarations: [
    SigninComponent,
    ErrorControlComponent,
    AddPermissionComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgzorroModule,
    MaterialModule
  ],
  exports:[
    SigninComponent,
    ErrorControlComponent,
    AddPermissionComponent,
    ListUsersComponent
  ]
})
export class UserModule { }