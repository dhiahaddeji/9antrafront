import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecificprojectRoutingModule } from './specificproject-routing.module';
import { SpecificprojectComponent } from './specificproject.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpecificprojectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SpecificprojectRoutingModule
  ]
})
export class SpecificprojectModule { }
