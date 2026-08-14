import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCalendarRoutingModule } from './admin-calendar-routing.module';
import { AdminCalendarComponent } from './admin-calendar.component';


@NgModule({
  declarations: [
    AdminCalendarComponent
  ],
  imports: [
    CommonModule,
    AdminCalendarRoutingModule
  ]
})
export class AdminCalendarModule { }
