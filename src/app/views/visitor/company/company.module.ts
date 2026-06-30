import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule } from '@angular/forms';
import { CompanyComponent } from './company.component';


@NgModule({
  declarations: [CompanyComponent],
  imports: [
    FormsModule,CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
