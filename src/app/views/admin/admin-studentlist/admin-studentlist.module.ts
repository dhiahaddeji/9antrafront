import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminStudentlistRoutingModule } from './admin-studentlist-routing.module';
import { AdminStudentlistComponent } from './admin-studentlist/admin-studentlist.component';


@NgModule({
  declarations: [
    AdminStudentlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AdminStudentlistRoutingModule,
  ]
})
export class AdminStudentlistModule { }
