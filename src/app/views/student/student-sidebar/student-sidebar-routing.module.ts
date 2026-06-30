import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';

const routes: Routes = [
  {path:'',component:StudentSidebarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentSidebarRoutingModule { }
