import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHackerspacesUpdateComponent } from './admin-hackerspaces-update/admin-hackerspaces-update.component';


const routes: Routes = [
  {path:'',component:AdminHackerspacesUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHackerspacesUpdateRoutingModule { }
