import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOffersRoutingModule } from './list-offers-routing.module';
import { ListOffersComponent } from './list-offers.component';


@NgModule({
  declarations: [
    ListOffersComponent
  ],
  imports: [
    CommonModule,
    ListOffersRoutingModule
  ]
})
export class ListOffersModule { }
