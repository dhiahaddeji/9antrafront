import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminprojectsComponent } from './adminprojects/adminprojects.component';

const routes: Routes = [
  {path:'',component:AdminprojectsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProjectsRoutingModule { }
