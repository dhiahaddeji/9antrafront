import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentlistComponent } from './admin-studentlist/admin-studentlist.component';

const routes: Routes = [
  {path:'',component:AdminStudentlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStudentlistRoutingModule { }
