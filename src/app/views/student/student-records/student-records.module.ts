import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRecordsRoutingModule } from './student-records-routing.module';
import { StudentRecordsComponent } from './student-records/student-records.component';


@NgModule({
  declarations: [
    StudentRecordsComponent
  ],
  imports: [
    CommonModule,
    StudentRecordsRoutingModule
  ]
})
export class StudentRecordsModule { }
