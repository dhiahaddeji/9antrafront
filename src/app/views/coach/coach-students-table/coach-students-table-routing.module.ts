import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachStudentsTableComponent } from './coach-students-table/coach-students-table.component';

const routes: Routes = [
  {path:'',component:CoachStudentsTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachStudentsTableRoutingModule { }
