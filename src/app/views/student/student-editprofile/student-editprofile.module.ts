import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentEditprofileRoutingModule } from './student-editprofile-routing.module';
import { StudentEditprofileComponent } from './student-editprofile/student-editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentEditprofileComponent],
  imports: [
    CommonModule,
    StudentEditprofileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class StudentEditprofileModule {}
