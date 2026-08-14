import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoachCalendarRoutingModule } from './coach-calendar-routing.module';
import { CoachCalendarComponent } from './coach-calendar/coach-calendar.component';
import { MeetComponent } from '../meet/meet.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoachCalendarComponent,
    MeetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoachCalendarRoutingModule,
    FormsModule
  ]
})
export class CoachCalendarModule { }
