import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AdminTrainingschapterRoutingModule } from './admin-trainingschapter-routing.module';
import { AdminTrainingschapterComponent } from './admin-trainingschapter/admin-trainingschapter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminChaptersComponent } from '../admin-chapters/admin-chapters.component';


@NgModule({
  declarations: [
    AdminTrainingschapterComponent,
    AdminChaptersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminTrainingschapterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminTrainingschapterModule { }
