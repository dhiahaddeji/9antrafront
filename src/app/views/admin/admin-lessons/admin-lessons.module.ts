import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLessonsRoutingModule } from './admin-lessons-routing.module';
import { AdminLessonsListComponent } from './admin-lessons-list/admin-lessons-list.component';
import { AdminLessonsAddFormComponent } from './admin-lessons-add-form/admin-lessons-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminLessonsListComponent,
    AdminLessonsAddFormComponent
  ],
  imports: [
    CommonModule,
    AdminLessonsRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminLessonsModule { }
