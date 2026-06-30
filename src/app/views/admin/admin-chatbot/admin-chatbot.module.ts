import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminChatbotRoutingModule } from './admin-chatbot-routing.module';
import { AdminChatbotComponent } from './admin-chatbot/admin-chatbot.component';



@NgModule({
  declarations: [
    AdminChatbotComponent
  ],
  imports: [
    CommonModule,
    AdminChatbotRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminChatbotModule { }
