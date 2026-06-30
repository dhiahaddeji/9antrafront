import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsSpecificOfferComponent } from './details-specific-offer.component';

const routes: Routes = [
  {path:'',component:DetailsSpecificOfferComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsSpecificOfferRoutingModule { }
