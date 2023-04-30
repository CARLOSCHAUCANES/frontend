import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './auth.guard';
import { TokenInterceptorService} from './services/token-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';

import { NameUserComponent } from './components/name-user/name-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component'

import { NgzorroModule } from './modules/ngzorro/ngzorro.module';
import { UserModule } from './modules/user/user.module';
import { MaterialModule } from './modules/material/material.module';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';
import { MainComponent } from './components/main/main.component';
import { AccountComponent } from './components/account/account.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { LoadingInterceptor } from './interceptors/loading.interceptor';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    NameUserComponent,
    TopMenuComponent,
    LeftMenuComponent,
    MainComponent,
    AccountComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgzorroModule,
    UserModule,
    MaterialModule
  ],
  providers: [
   AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
