import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentForumComponent } from './student-forum.component';

const routes: Routes = [{ path: '', component: StudentForumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentForumRoutingModule { }
