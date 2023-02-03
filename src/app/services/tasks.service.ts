import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  url = "http://localhost:3000/api";
  getTasks(){
    return this.http.get<any>(this.url+"/task");
  }
  getPrivateTasks(){
    return this.http.get<any>(this.url+"/private-task");
  }
}
