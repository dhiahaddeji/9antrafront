import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DetailOffersComponent } from './detail-offers.component';
import { DetailOffersRoutingModule } from './detail-offers-routing.module';


@NgModule({
  declarations: [DetailOffersComponent],
  imports: [
    CommonModule,
    DetailOffersRoutingModule , FormsModule
  ]
})
export class DetailOffersModule { }
