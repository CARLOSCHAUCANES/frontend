import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-name-user',
  templateUrl: './name-user.component.html',
  styleUrls: ['./name-user.component.scss']
})
export class NameUserComponent implements OnInit {
  name:String = "";
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.loggedIn()){
      this.name = this.authService.getUser().name;
    }
  }

}
