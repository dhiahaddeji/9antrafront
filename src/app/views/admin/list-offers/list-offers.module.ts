import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOffersRoutingModule } from './list-offers-routing.module';
import { ListOffersComponent } from './list-offers.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListOffersComponent
  ],
  imports: [
    CommonModule,FormsModule,
    ListOffersRoutingModule
  ]
})
export class ListOffersModule { }
