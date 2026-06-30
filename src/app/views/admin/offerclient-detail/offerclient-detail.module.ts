import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferclientDetailRoutingModule } from './offerclient-detail-routing.module';
import { OfferclientDetailComponent } from './offerclient-detail.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OfferclientDetailComponent],
  imports: [
    CommonModule,
    OfferclientDetailRoutingModule, FormsModule
  ]
})
export class OfferclientDetailModule { }
