import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHackerspaceformComponent } from './admin-hackerspaceform/admin-hackerspaceform.component';

const routes: Routes = [
  {path:'',component:AdminHackerspaceformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHackerspaceformRoutingModule { }
