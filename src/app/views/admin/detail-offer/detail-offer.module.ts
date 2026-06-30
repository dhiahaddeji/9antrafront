import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailOfferRoutingModule } from './detail-offer-routing.module';
import { DetailOfferComponent } from './detail-offer.component';


@NgModule({
  declarations: [
    DetailOfferComponent
  ],
  imports: [
    CommonModule,
    DetailOfferRoutingModule
  ]
})
export class DetailOfferModule { }
