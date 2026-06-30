import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferclientDetailComponent } from './offerclient-detail.component';


const routes: Routes = [
  {path:'',component:OfferclientDetailComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferclientDetailRoutingModule { }
