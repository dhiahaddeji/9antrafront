import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentprofileRoutingModule } from './admin-studentprofile-routing.module';
import { AdminStudentprofileComponent } from './admin-studentprofile/admin-studentprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminStudentprofileComponent
  ],
  imports: [
    CommonModule,
    AdminStudentprofileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminStudentprofileModule {}
