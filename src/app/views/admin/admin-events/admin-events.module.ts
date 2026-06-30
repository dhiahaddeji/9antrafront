import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEventsRoutingModule } from './admin-events-routing.module';
import { AdminEventsComponent } from './admin-events/admin-events/admin-events.component';
import { AdminEventsAttendanceComponent } from './admin-events-attendance/admin-events-attendance.component';


@NgModule({
  declarations: [
    AdminEventsComponent,
    AdminEventsAttendanceComponent,
  ],
  imports: [
    CommonModule,
    AdminEventsRoutingModule
  ]
})
export class AdminEventsModule { }
