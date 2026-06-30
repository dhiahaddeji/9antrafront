import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachChatAllComponent } from './coach-chat-all.component';

const routes: Routes = [{ path: '', component: CoachChatAllComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachChatAllRoutingModule { }
