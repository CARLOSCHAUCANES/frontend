import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import {AuthService} from './services/auth.service';
import { ConfigConst as CONFIG } from './config/config.const';
import {Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 public showUpdateUser:boolean=false;
 public dataUser:any;
 public permission:boolean = false;

 constructor(public authService:AuthService,private route:ActivatedRoute){}
 title = 'frontend';

  ngOnInit(): void {

    this.authService.checkAuthorization().subscribe(
      res=>{
        if(res.status == CONFIG.C401){
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
 

  updateSesion($event:any){
    const dataU = ""+$event+"";
    this.dataUser = JSON.parse(dataU);
  }




}
