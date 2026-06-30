import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificprojectDetailsComponent } from './specificproject-details.component';

const routes: Routes = [
  {path:'',component:SpecificprojectDetailsComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificprojectDetailsRoutingModule { }
