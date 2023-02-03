import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-control',
  templateUrl: './error-control.component.html',
  styleUrls: ['./error-control.component.scss']
})
export class ErrorControlComponent implements OnInit {
  @Input() errorCedula:string = '';
  @Input() errorEmail:string = '';
  @Input() errorName:string = '';
  @Input() errorLastName:string = '';
  @Input() errorPassword:string = '';
  @Input() errorPhone:string = '';
  @Input() errorConfirm:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
