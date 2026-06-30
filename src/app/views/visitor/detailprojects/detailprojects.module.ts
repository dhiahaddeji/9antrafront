import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailprojectsRoutingModule } from './detailprojects-routing.module';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailProjectComponent

  ],
  imports: [
    CommonModule,
    DetailprojectsRoutingModule, 
    FormsModule
  ]
})
export class DetailprojectsModule { }
