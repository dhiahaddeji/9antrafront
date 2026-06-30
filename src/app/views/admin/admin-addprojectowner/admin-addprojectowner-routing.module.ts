import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddprojectownerComponent } from './admin-addprojectowner.component';

const routes: Routes = [
  {path:'',component:AdminAddprojectownerComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAddprojectownerRoutingModule { }
