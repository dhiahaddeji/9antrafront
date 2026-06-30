import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoachCalendarRoutingModule } from './coach-calendar-routing.module';
import { CoachCalendarComponent } from './coach-calendar/coach-calendar.component';
import { MeetComponent } from '../meet/meet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    CoachCalendarComponent,
    MeetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoachCalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ]
})
export class CoachCalendarModule { }
