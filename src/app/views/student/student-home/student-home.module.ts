import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentHomeRoutingModule } from './student-home-routing.module';
import { StudentHomeComponent } from './student-home/student-home.component';


@NgModule({
  declarations: [
    StudentHomeComponent
  ],
  imports: [
    CommonModule,
    StudentHomeRoutingModule
  ]
})
export class StudentHomeModule { }
