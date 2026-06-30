import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetcertifcatesComponent } from './getcertifcates.component';

const routes: Routes = [
  { path: '', component: GetcertifcatesComponent },
  { path: ':id', component: GetcertifcatesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetcertifcatesRoutingModule { }
