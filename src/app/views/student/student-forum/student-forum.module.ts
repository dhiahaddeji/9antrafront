import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentForumRoutingModule } from './student-forum-routing.module';
import { StudentForumComponent } from './student-forum.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentForumComponent
  ],
  imports: [
    CommonModule,
    StudentForumRoutingModule,
    FormsModule
  ]
})
export class StudentForumModule { }
