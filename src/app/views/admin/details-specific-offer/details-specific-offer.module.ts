import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsSpecificOfferRoutingModule } from './details-specific-offer-routing.module';
import { DetailsSpecificOfferComponent } from './details-specific-offer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailsSpecificOfferComponent
  ],
  imports: [
    CommonModule,
    DetailsSpecificOfferRoutingModule, FormsModule
  ]
})
export class DetailsSpecificOfferModule { }
