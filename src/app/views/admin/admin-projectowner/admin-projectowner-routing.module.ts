import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProjectownerComponent } from './admin-projectowner/admin-projectowner.component';

const routes: Routes = [
  {path:'',component:AdminProjectownerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProjectownerRoutingModule { }
