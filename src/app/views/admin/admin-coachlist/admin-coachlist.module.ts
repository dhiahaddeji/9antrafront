import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCoachlistRoutingModule } from './admin-coachlist-routing.module';
import { AdminCoachlistComponent } from './admin-coachlist/admin-coachlist.component';
import { ResumecoachComponent } from './admin-coachlist/resumecoach/resumecoach.component';



@NgModule({
  declarations: [
    AdminCoachlistComponent,
    ResumecoachComponent,
  ],
  imports: [
    CommonModule,
    AdminCoachlistRoutingModule
  ]
})
export class AdminCoachlistModule { }
