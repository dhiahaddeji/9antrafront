import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineRoutingModule } from './online-routing.module';
import { OnlineComponent } from './online/online.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OnlineComponent,
    CourseListComponent,
    CourseDetailsComponent,
    LessonsListComponent,
  ],
  imports: [
    CommonModule,
    OnlineRoutingModule,
    SharedModule,
  ]
})
export class OnlineModule { }
