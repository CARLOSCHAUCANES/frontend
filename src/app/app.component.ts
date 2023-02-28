import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from './services/auth.service';
import { ConfigConst as CONFIG } from './config/config.const';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 public showUpdateUser:boolean=false;
 public dataUser:any;

  ngOnInit(): void {
    //-----------------------------------
    //-----------------------------------
    this.authService.checkAuthorization().subscribe(
      res=>{
        if(res.status == CONFIG.C401){
          console.log(CONFIG.NOAUTHORIZATION);
        }
      },
      err=>{
        if(err.status == CONFIG.C401){
          this.authService.logout();
        }
      }
    );
    if(this.authService.getToken()){
      if(this.authService.getUser()){
        const dataU = ""+localStorage.getItem("user")+"";
        this.dataUser = JSON.parse(dataU);
      }
    }
  }

ngOnDestroy(){
}

  constructor(public authService:AuthService){}
  title = 'frontend';

  updateSesion($event:any){
    alert("hola mundo");
    const dataU = ""+$event+"";
    this.dataUser = JSON.parse(dataU);
  }


}
