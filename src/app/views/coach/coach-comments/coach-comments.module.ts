import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachCommentsRoutingModule } from './coach-comments-routing.module';
import { CoachCommentsComponent } from './coach-comments/coach-comments.component';


@NgModule({
  declarations: [
    CoachCommentsComponent
  ],
  imports: [
    CommonModule,
    CoachCommentsRoutingModule
  ]
})
export class CoachCommentsModule { }
