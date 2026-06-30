import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTrainingsformComponent } from './admin-trainingsform/admin-trainingsform.component';

const routes: Routes = [
  {path:'',component:AdminTrainingsformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTrainingsformRoutingModule { }
