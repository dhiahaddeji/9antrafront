import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProjectsRoutingModule } from './student-projects-routing.module';
import { StudentProjectsComponent } from './student-projects/student-projects.component';


@NgModule({
  declarations: [
    StudentProjectsComponent
  ],
  imports: [
    CommonModule,
    StudentProjectsRoutingModule
  ]
})
export class StudentProjectsModule { }
