import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
const ngZorroConfig: NzConfig = {
   notification: { nzDuration: 3000 } 
};

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzNotificationModule,
    NzInputModule,
    NzFormModule,
    NzSpinModule 
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ]
})
export class NgzorroModule { }
