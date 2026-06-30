import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHackerspacesComponent } from './admin-hackerspaces/admin-hackerspaces.component';

const routes: Routes = [
  {path:'',component:AdminHackerspacesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHacherspacesRoutingModule { }
