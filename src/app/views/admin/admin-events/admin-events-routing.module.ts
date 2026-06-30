import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEventsComponent } from './admin-events/admin-events/admin-events.component';
import { AdminEventsAttendanceComponent } from './admin-events-attendance/admin-events-attendance.component';

const routes: Routes = [
  {path: '', component:AdminEventsComponent},
  {path: ':eventId/attendance', component:AdminEventsAttendanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEventsRoutingModule { }
