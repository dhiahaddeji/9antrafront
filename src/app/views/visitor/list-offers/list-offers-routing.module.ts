import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOffersComponent } from './list-offers.component';

const routes: Routes = [
  {path:'',component:ListOffersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOffersRoutingModule { }
