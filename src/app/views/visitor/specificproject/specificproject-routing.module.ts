import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificprojectComponent } from './specificproject.component';

const routes: Routes = [
  {path:'',component:SpecificprojectComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificprojectRoutingModule { }
