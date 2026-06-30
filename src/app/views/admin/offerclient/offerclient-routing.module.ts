import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferclientComponent } from './offerclient.component';


const routes: Routes = [
  {path:'',component:OfferclientComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferclientRoutingModule { }
