// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe }from '../../pipes/filter.pipe';

import { HistoryComponent } from './history.component';

// Theme Routing
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule
  ],
  declarations: [
    HistoryComponent,
    FilterPipe
  ]
})
export class HistoryModule { }
