import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    AdminCoachlistRoutingModule
  ]
})
export class AdminCoachlistModule { }
