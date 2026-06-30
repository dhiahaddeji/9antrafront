import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateCertifComponent } from './generate-certif.component';

const routes: Routes = [
  {path:'',component:GenerateCertifComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateCertifRoutingModule { }
