import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentChatAllComponent } from './student-chat-all.component';

const routes: Routes = [{ path: '', component: StudentChatAllComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentChatAllRoutingModule { }
