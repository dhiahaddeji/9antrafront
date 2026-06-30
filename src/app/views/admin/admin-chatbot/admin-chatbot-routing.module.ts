import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminChatbotComponent } from './admin-chatbot/admin-chatbot.component';


const routes: Routes = [{ path: '', component: AdminChatbotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminChatbotRoutingModule { }
