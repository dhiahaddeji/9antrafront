import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGroupmembersComponent } from './admin-groupmembers/admin-groupmembers.component';

const routes: Routes = [
  {path:'',component:AdminGroupmembersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGroupmembersRoutingModule { }
