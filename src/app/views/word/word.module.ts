import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WordComponent } from './word.component';
import { WordRoutingModule } from './word-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WordRoutingModule,
    FormsModule
  ],
  declarations: [ 
    WordComponent,
  ]
})
export class WordModule { }
