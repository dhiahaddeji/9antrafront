import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAddprojectsRoutingModule } from './admin-addprojects-routing.module';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProjectsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminAddprojectsRoutingModule
  ]
})
export class AdminAddprojectsModule { }
