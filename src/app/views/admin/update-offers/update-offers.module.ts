import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateOffersRoutingModule } from './update-offers-routing.module';
import { FormsModule } from '@angular/forms';
import { UpdateOffersComponent } from './update-offers.component';


@NgModule({
  declarations: [ UpdateOffersComponent ],
  imports: [
    CommonModule,
    UpdateOffersRoutingModule, 
    FormsModule  ]
})
export class UpdateOffersModule { }
