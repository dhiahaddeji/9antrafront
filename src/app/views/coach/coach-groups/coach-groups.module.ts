import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachGroupsRoutingModule } from './coach-groups-routing.module';
import { CoachGroupsComponent } from './coach-groups/coach-groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CoachGroupsComponent,

  ],
  imports: [
    CommonModule,
    CoachGroupsRoutingModule,
    FormsModule,

    ReactiveFormsModule

  ]
})
export class CoachGroupsModule { }
