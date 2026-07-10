import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminMessagesRoutingModule } from './admin-messages-routing.module';
import { AdminMessagesComponent } from './admin-messages.component';
import { FirebaseChatModule } from 'src/app/MesServices/Chat/firebase-chat.module';

@NgModule({
  declarations: [AdminMessagesComponent],
  imports: [CommonModule, FormsModule, RouterModule, AdminMessagesRoutingModule, FirebaseChatModule],
})
export class AdminMessagesModule {}
