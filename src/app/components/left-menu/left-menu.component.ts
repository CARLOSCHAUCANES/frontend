import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RoutesConst as R } from 'src/app/config/routes.const';
import { EnableRoute} from 'src/app/interfaces/enableRoute';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  public LISTUSERS:EnableRoute = R.LISTUSERS;
  public ADDPERMISSION:EnableRoute = R.ADDPERMISSION;
  activeRoute:any = "";
  stateRoute:any = "";
  begginRoute:any = "";
  constructor(private service:AuthService) { }
  ngOnInit(): void {
    this.verify();
  }
  verifyPermission(route:string):Promise<boolean>{  
    return new Promise((resolve,reject)=>{
       this.service.getPermission(route).subscribe(permission=>{
        if(permission){
          resolve(true);
        }
        else{
          resolve(false);
        }    
      })
    });
  }

  async validatePermission(route:any){
    this.stateRoute = await this.verifyPermission(route+"");
    this.activeRoute = route;
  }

  async verify(){
    this.LISTUSERS.permission = await this.verifyPermission(this.LISTUSERS.route+"");
    this.ADDPERMISSION.permission = await this.verifyPermission(this.ADDPERMISSION.route+"");
  }
}
