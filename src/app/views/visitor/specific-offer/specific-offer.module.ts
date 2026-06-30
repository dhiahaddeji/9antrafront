import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificOfferRoutingModule } from './specific-offer-routing.module';
import { SpecificOfferComponent } from './specific-offer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SpecificOfferComponent],
  imports: [
    CommonModule,FormsModule,
    SpecificOfferRoutingModule
  ]
})
export class SpecificOfferModule { }
