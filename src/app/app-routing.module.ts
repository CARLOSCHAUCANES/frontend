import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './auth.guard';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';
import { MainComponent } from './components/main/main.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  {
    path:'',
    //redirectTo:'main',
    component:MainComponent,
    pathMatch:'full'
  },
  {
    path:'add-permission',
    component:AddPermissionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'list-users',
    component:ListUsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'account',
    component:AccountComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
