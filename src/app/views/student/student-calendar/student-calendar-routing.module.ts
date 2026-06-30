import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentCalendarComponent } from './student-calendar/student-calendar.component';
import { MeetComponent } from '../meet/meet.component';

const routes: Routes = [
  {path:'',component:StudentCalendarComponent},
  {
    path: 'meeting/:id',
    component: MeetComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCalendarRoutingModule { }
