import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachChatComponent } from './coach-chat/coach-chat.component';

const routes: Routes = [
  {path:'',component:CoachChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachChatRoutingModule { }
