import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ConfigConst } from 'src/app/config/config.const'; 
import { UserConst } from 'src/app/config/user.const';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  

  user = {
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
        if(res.status == ConfigConst.C200)
        { 
          localStorage.setItem(ConfigConst.TOKEN,res.response.token);
          localStorage.setItem(ConfigConst.USER,JSON.stringify(res.response.user));
          this.router.navigate([ConfigConst.ROUTES.private]);
        }
      },
      err=>{ 
        if(err.status >=ConfigConst.C400 && err.status <=ConfigConst.C499)
        {
          this.notificacionService.createNotification1(ConfigConst.TYPENOTIFiCATION.WARNING,UserConst.NOTIFICATION.LOGIN,err.message)
        }
        else
        {
          this.notificacionService.createNotification1(ConfigConst.TYPENOTIFiCATION.ERROR,UserConst.NOTIFICATION.LOGIN,err.message)
        }
      }
    );
  }

}
