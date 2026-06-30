import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectMemberComponent } from './project-member.component';

const routes: Routes = [
  {path:'table/:id',component:ProjectMemberComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMemberRoutingModule { }
