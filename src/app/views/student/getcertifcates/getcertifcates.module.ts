import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetcertifcatesRoutingModule } from './getcertifcates-routing.module';
import { GetcertifcatesComponent } from './getcertifcates.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetcertifcatesComponent
  ],
  imports: [
    CommonModule,FormsModule,
    GetcertifcatesRoutingModule
  ]
})
export class GetcertifcatesModule { }
