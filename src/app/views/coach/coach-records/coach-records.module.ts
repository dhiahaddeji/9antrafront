import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachRecordsRoutingModule } from './coach-records-routing.module';
import { CoachRecordsComponent } from './coach-records/coach-records.component';


@NgModule({
  declarations: [
    CoachRecordsComponent
  ],
  imports: [
    CommonModule,
    CoachRecordsRoutingModule
  ]
})
export class CoachRecordsModule { }
