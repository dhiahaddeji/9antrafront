import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupcalendarRoutingModule } from './admin-groupcalendar-routing.module';
import { AdminGroupcalendarComponent } from './admin-groupcalendar/admin-groupcalendar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminGroupcalendarComponent
  ],
  imports: [
    CommonModule,FormsModule,
    AdminGroupcalendarRoutingModule
  ]
})
export class AdminGroupcalendarModule { }
