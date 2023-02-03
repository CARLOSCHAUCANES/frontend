import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import {AuthService} from './../../services/auth.service'

interface User {
  _id: string;
  email: string;
  name: number;
  password: string;
  createdAt:Date;
  updatedAt:Date;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  listOfData: User[] = [];
   
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getListUsers();
    console.log(this.listOfData);
  }

     getListUsers(){
     this.authService.getListUser().subscribe(
      res=>{
        this.listOfData=res.users;
        console.log(this.listOfData);
      },
      err=>{
        console.log(err);
      }
    )
    
    //let lis = JSON.parse(""+list);
    //console.log(lis);
  }

}
