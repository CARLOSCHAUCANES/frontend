import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { TaskComponent } from './components/task/task.component';
import { PrivateTaskComponent } from './components/private-task/private-task.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './auth.guard';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tasks',
    pathMatch:'full'
  },
  {
    path:'tasks',
    component:TaskComponent
  },
  {
    path:'private',
    component:PrivateTaskComponent,
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
    component:ListUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
