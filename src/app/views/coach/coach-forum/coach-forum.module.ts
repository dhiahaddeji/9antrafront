import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachForumRoutingModule } from './coach-forum-routing.module';
import { CoachForumComponent } from './coach-forum.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoachForumComponent
  ],
  imports: [
    CommonModule,
    CoachForumRoutingModule,
    FormsModule
  ]
})
export class CoachForumModule { }
