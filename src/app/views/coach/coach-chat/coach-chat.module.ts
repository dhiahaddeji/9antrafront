import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachChatRoutingModule } from './coach-chat-routing.module';
import { CoachChatComponent } from './coach-chat/coach-chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoachChatComponent],
  imports: [CommonModule, CoachChatRoutingModule, FormsModule],
})
export class CoachChatModule {}
