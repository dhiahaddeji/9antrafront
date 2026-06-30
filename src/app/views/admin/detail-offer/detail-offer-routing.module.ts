import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailOfferComponent } from './detail-offer.component';

const routes: Routes = [
  {path:'',component:DetailOfferComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailOfferRoutingModule { }
