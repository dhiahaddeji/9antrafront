import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentChatRoutingModule } from './student-chat-routing.module';
import { StudentChatComponent } from './student-chat/student-chat.component';
import { FormsModule } from '@angular/forms';
import { FirebaseChatModule } from 'src/app/MesServices/Chat/firebase-chat.module';

@NgModule({
  declarations: [StudentChatComponent],
  imports: [CommonModule, StudentChatRoutingModule, FormsModule, FirebaseChatModule],
})
export class StudentChatModule {}
