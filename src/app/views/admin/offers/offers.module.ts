import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    CommonModule,FormsModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
