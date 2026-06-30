import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentChatComponent } from './student-chat/student-chat.component';


const routes: Routes = [{ path: '', component: StudentChatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentChatRoutingModule {}
