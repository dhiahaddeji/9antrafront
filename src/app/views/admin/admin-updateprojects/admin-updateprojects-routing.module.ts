import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProjectsComponent } from './update-projects/update-projects.component';


const routes: Routes = [
  {path:'',component:UpdateProjectsComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUpdateprojectsRoutingModule { }
