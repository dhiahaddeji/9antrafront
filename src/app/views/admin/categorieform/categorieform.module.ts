import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieformRoutingModule } from './categorieform-routing.module';
import { CategorieformComponent } from './categorieform/categorieform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategorieformComponent
  ],
  imports: [
    CommonModule,
    CategorieformRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
  ]
})
export class CategorieformModule { }
