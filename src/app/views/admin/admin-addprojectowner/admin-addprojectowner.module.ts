import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAddprojectownerRoutingModule } from './admin-addprojectowner-routing.module';
import { AdminAddprojectownerComponent } from './admin-addprojectowner.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminAddprojectownerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminAddprojectownerRoutingModule
  ]
})
export class AdminAddprojectownerModule { }
