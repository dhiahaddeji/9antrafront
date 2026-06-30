import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecificOfferComponent } from './specific-offer.component';

const routes: Routes = [
  {path:'',component:SpecificOfferComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecificOfferRoutingModule { }
