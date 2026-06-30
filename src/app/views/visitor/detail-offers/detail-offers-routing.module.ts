import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOffersComponent } from './detail-offers.component';

const routes: Routes = [
  {path:'',component:DetailOffersComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailOffersRoutingModule { }
