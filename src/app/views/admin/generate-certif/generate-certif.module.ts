import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateCertifRoutingModule } from './generate-certif-routing.module';
import { GenerateCertifComponent } from './generate-certif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GenerateCertifComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    GenerateCertifRoutingModule
  ]
})
export class GenerateCertifModule { }
