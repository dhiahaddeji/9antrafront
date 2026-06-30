import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUpdateprojectownerComponent } from './admin-updateprojectowner.component';

const routes: Routes = [
  {path:'',component:AdminUpdateprojectownerComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUpdateprojectownerRoutingModule { }
