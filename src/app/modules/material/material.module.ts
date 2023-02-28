import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatSlideToggleModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
