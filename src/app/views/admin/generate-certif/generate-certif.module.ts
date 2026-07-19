import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateCertifRoutingModule } from './generate-certif-routing.module';
import { GenerateCertifComponent } from './generate-certif.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [GenerateCertifComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    HttpClientModule, RouterModule,
    GenerateCertifRoutingModule
  ]
})
export class GenerateCertifModule { }
