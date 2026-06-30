import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectsComponent } from './add-projects/add-projects.component';

const routes: Routes = [
  {path:'',component:AddProjectsComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAddprojectsRoutingModule { }
