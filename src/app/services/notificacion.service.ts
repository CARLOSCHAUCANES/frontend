import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  public typeNotification:string = "";
  public title:string = "";
  public message:string = "";
  constructor(private notification: NzNotificationService) { 
    
  }
  createNotification(): void {
    this.notification.create(this.typeNotification,this.title,this.message);
  }
  createNotification1(type:string,title:string,message:string): void {
    this.notification.create(type,title,message);
  }

}
