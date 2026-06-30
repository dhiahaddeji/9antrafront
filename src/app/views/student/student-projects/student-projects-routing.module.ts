import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProjectsComponent } from './student-projects/student-projects.component';

const routes: Routes = [
  {path:'',component:StudentProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProjectsRoutingModule { }
