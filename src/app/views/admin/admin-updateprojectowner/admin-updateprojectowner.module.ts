import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUpdateprojectownerRoutingModule } from './admin-updateprojectowner-routing.module';
import { AdminUpdateprojectownerComponent } from './admin-updateprojectowner.component';
import { AdminProjectownerComponent } from '../admin-projectowner/admin-projectowner/admin-projectowner.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'',component:AdminUpdateprojectownerComponent},
  { path: 'admin/projectowner', component: AdminProjectownerComponent },

];
@NgModule({
  declarations: [
    AdminUpdateprojectownerComponent
  ],
  imports: [
    CommonModule,FormsModule,
    AdminUpdateprojectownerRoutingModule
  ]
})
export class AdminUpdateprojectownerModule { }
