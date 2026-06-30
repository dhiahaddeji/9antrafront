import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSpecificOfferComponent } from './all-specific-offer.component';

const routes: Routes = [
  {path:'',component:AllSpecificOfferComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllSpecificOfferRoutingModule { }
