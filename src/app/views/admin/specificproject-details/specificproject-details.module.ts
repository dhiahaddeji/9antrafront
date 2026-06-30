import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificprojectDetailsRoutingModule } from './specificproject-details-routing.module';
import { FormsModule } from '@angular/forms';
import { SpecificprojectDetailsComponent } from './specificproject-details.component';


@NgModule({
  declarations: [SpecificprojectDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SpecificprojectDetailsRoutingModule
  ]
})
export class SpecificprojectDetailsModule { }
