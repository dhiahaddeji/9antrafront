import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCompanyRoutingModule } from './add-company-routing.module';
import { AddCompanyComponent } from './add-company.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCompanyComponent
  ],
  imports: [
    CommonModule,FormsModule,
    AddCompanyRoutingModule
  ]
})
export class AddCompanyModule { }
