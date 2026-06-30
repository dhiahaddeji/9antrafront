import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTrainingsformRoutingModule } from './admin-trainingsform-routing.module';
import { AdminTrainingsformComponent } from './admin-trainingsform/admin-trainingsform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/materiel/materiel.module';


@NgModule({
  declarations: [
    AdminTrainingsformComponent
  ],
  imports: [
    CommonModule,
    AdminTrainingsformRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MaterialModule
  ]
})
export class AdminTrainingsformModule { }
