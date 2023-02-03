import { Component, OnInit, Input,Output } from '@angular/core';
import {AuthService} from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 public showUpdateUser:boolean=false;
 public dataUser:any;
  ngOnInit(): void {
    if(this.authService.getToken()){
      if(this.authService.getUser()){
        const dataU = ""+localStorage.getItem("user")+"";
        this.dataUser = JSON.parse(dataU);
      }
    }
  }
  constructor(public authService:AuthService){}
  title = 'frontend';

  updateSesion($event:any){
    alert("hola mundo");
    const dataU = ""+$event+"";
    this.dataUser = JSON.parse(dataU);
  }


}
