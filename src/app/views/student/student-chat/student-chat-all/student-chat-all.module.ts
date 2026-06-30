import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentChatAllRoutingModule } from './student-chat-all-routing.module';
import { StudentChatAllComponent } from './student-chat-all.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentChatAllComponent
  ],
  imports: [
    CommonModule,
    StudentChatAllRoutingModule,
    FormsModule
  ]
})
export class StudentChatAllModule { }
