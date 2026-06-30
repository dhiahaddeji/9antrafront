import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSpecificOfferRoutingModule } from './all-specific-offer-routing.module';
import { AllSpecificOfferComponent } from './all-specific-offer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllSpecificOfferComponent
  ],
  imports: [
    CommonModule,
    AllSpecificOfferRoutingModule, FormsModule
  ]
})
export class AllSpecificOfferModule { }
