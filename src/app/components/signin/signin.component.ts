import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ConfigConst as CC } from 'src/app/config/config.const'; 
import { UserConst as UC } from 'src/app/config/user.const';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public user = {
    'email':'',
    'name':'',
    'password':''
  };
  constructor(
    private authService:AuthService,
    private router:Router,
    private notificacionService:NotificacionService,
    ) { }
  ngOnInit(): void {
  }
  signin(){
    this.authService.signin(this.user).subscribe(
      res=>{ 
        if(res.status == CC.CODES.C200)
        { 
          localStorage.setItem(CC.AUTHORIZATION.token,res.response.token);
          localStorage.setItem(CC.AUTHORIZATION.user,JSON.stringify(res.response.user));
          this.router.navigate([CC.ROUTES.private]);
        }
      },
      err=>{ 
        if(err.status >=CC.CODES.C400 && err.status <=CC.CODES.C499)
        {
          this.notificacionService.createNotification1(CC.TYPE_NOTIFiCATION.warning,UC.TITLE_NOTIFICATION.login,err.message)
        }
        else
        {
          this.notificacionService.createNotification1(CC.TYPE_NOTIFiCATION.error,UC.TITLE_NOTIFICATION.login,err.message)
        }
      }
    );
  }

}
