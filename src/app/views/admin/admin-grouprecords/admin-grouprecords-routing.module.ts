import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGrouprecordsComponent } from './admin-grouprecords/admin-grouprecords.component';

const routes: Routes = [
  {path:'',component:AdminGrouprecordsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGrouprecordsRoutingModule { }
