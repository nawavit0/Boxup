import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
    imports: [
      FormsModule,
      ReportRoutingModule,
      ChartsModule,
      BsDropdownModule,
      ButtonsModule.forRoot()
    ],
    declarations: [ ReportComponent ]
  })
  export class ReportModule { }
  