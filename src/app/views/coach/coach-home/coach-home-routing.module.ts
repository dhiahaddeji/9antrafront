import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachHomeComponent } from './coach-home/coach-home.component';

const routes: Routes = [
  {path:'',component:CoachHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachHomeRoutingModule { }
