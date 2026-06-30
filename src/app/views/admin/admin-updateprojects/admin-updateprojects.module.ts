import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUpdateprojectsRoutingModule } from './admin-updateprojects-routing.module';
import { UpdateProjectsComponent } from './update-projects/update-projects.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminprojectsComponent } from '../admin-projects/adminprojects/adminprojects.component';

const routes: Routes = [
  {path:'',component:UpdateProjectsComponent},
  { path: 'admin/projects', component: AdminprojectsComponent },

];
@NgModule({
  declarations: [
    UpdateProjectsComponent
  ],
  imports: [
    FormsModule,

    CommonModule,
    AdminUpdateprojectsRoutingModule
  ]
})
export class AdminUpdateprojectsModule { }
