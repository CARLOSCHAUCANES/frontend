import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EnableRoute} from 'src/app/interfaces/enableRoute';
import { RoutesConst as R } from 'src/app/config/routes.const';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  public ACCOUNT:EnableRoute = R.VIEWACCOUNT;
  constructor(private service:AuthService) { }

  ngOnInit(): void {
    
  }

  async verify(){
    this.ACCOUNT.permission = await this.verifyPermission(this.ACCOUNT.route+"");
  }
  verifyPermission(route:string):Promise<boolean>{
    return new Promise((resolve,reject)=>{
       this.service.getPermission(route).subscribe(permission=>{
        console.log("Permiso=>",permission);
        if(permission){
          resolve(true);
        }
        else{
          resolve(false);
        }
        
        
      })
    });
  }

}
