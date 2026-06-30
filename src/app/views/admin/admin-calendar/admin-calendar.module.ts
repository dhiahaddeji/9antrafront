import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCalendarRoutingModule } from './admin-calendar-routing.module';
import { AdminCalendarComponent } from './admin-calendar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminCalendarComponent
  ],
  imports: [
    CommonModule,
    AdminCalendarRoutingModule,
    FormsModule
  ]
})
export class AdminCalendarModule { }
