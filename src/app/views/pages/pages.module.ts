import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [ PagesRoutingModule,FormsModule, CommonModule],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
  ]
})
export class PagesModule { }
