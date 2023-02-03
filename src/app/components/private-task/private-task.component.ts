import { Component, OnInit } from '@angular/core';
import {TasksService} from './../../services/tasks.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-task',
  templateUrl: './private-task.component.html',
  styleUrls: ['./private-task.component.scss']
})
export class PrivateTaskComponent implements OnInit {
  public tasks:any[] = [];
  constructor(private tasksService:TasksService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getTaskPrivate();
  }

  getTaskPrivate(){
    try{
      this.tasksService.getPrivateTasks().subscribe(
        res=>{
          this.tasks = res;
        },
        err=>{
          if(err.status = 403)
          {
              if(this.authService.loggedIn()){
                this.authService.logout();
              }
              console.log("sesion expirada");
          }
          //console.log("hooa caballo",err.status,err.error.mensaje)
        }
        
      )
    }catch(err){

    }

  }
}
