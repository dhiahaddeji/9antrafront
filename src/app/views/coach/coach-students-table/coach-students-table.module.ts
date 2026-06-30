import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachStudentsTableRoutingModule } from './coach-students-table-routing.module';
import { CoachStudentsTableComponent } from './coach-students-table/coach-students-table.component';


@NgModule({
  declarations: [
    CoachStudentsTableComponent
  ],
  imports: [
    CommonModule,
    CoachStudentsTableRoutingModule
  ]
})
export class CoachStudentsTableModule { }
