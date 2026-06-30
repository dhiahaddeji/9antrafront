import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTrainingsRoutingModule } from './admin-trainings-routing.module';
import { AdminTrainingsComponent } from './admin-trainings/admin-trainings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AdminTrainingsComponent
  ],
  imports: [
    
    CommonModule,
    AdminTrainingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminTrainingsModule { }
