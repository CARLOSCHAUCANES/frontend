import { Component, OnInit } from '@angular/core';
import {TasksService} from './../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private tasksService:TasksService) { }
  tasks:any[] = [];
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.tasksService.getTasks().subscribe(
      res=>{
        this.tasks = res;
        console.log(this.tasks);
      },
      err=>{
        console.log(err);
      }

    )
  }
}
