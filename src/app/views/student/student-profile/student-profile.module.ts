import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileRoutingModule } from './student-profile-routing.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentProfileComponent],
  imports: [
    CommonModule,
    StudentProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StudentProfileModule {}
