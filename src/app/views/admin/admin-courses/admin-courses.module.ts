import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCoursesRoutingModule } from './admin-courses-routing.module';
import { AdminCoursesListComponent } from './admin-courses-list/admin-courses-list.component';
import { AdminCourseAddFormComponent } from './admin-course-add-form/admin-course-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCourseDetailsComponent } from './admin-course-details/admin-course-details.component';
import { AdminCourseUpdateFormComponent } from './admin-course-update-form/admin-course-update-form.component';


@NgModule({
  declarations: [
    AdminCoursesListComponent,
    AdminCourseAddFormComponent,
    AdminCourseDetailsComponent,
    AdminCourseUpdateFormComponent
  ],
  imports: [
    CommonModule,
    AdminCoursesRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminCoursesModule { }
