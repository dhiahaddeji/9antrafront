import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachChatAllRoutingModule } from './coach-chat-all-routing.module';
import { CoachChatAllComponent } from './coach-chat-all.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoachChatAllComponent
  ],
  imports: [
    CommonModule,
    CoachChatAllRoutingModule,
    FormsModule
  ]
})
export class CoachChatAllModule { }
