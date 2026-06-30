import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateCompanyRoutingModule } from './update-company-routing.module';
import { UpdateCompanyComponent } from './update-company.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateCompanyComponent
  ],
  imports: [
    CommonModule,FormsModule,
    UpdateCompanyRoutingModule
  ]
})
export class UpdateCompanyModule { }
