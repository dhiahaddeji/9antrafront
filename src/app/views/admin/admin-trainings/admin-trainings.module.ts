import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminTrainingsRoutingModule } from './admin-trainings-routing.module';
import { AdminTrainingsComponent } from './admin-trainings/admin-trainings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminTrainingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminTrainingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminTrainingsModule { }
