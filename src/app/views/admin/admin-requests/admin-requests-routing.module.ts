import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRequestListComponent } from './admin-request-list/admin-request-list.component';

const routes: Routes = [
  {path: '', component:AdminRequestListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRequestsRoutingModule { }
