import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProjectsRoutingModule } from './admin-projects-routing.module';
import { AdminprojectsComponent } from './adminprojects/adminprojects.component';


@NgModule({
  declarations: [AdminprojectsComponent
  ],
  imports: [
    CommonModule,
    AdminProjectsRoutingModule
  ]
})
export class AdminProjectsModule { }
