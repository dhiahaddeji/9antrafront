import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTrainingsComponent } from './admin-trainings/admin-trainings.component';

const routes: Routes = [
  {path:'',component:AdminTrainingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTrainingsRoutingModule { }
