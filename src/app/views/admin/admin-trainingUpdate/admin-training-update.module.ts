import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminTrainingUpdateComponent } from './admin-training-update/admin-training-update.component';
import { AdminTrainingUpdateRoutingModule } from './admin-training-update-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/materiel/materiel.module';


@NgModule({
  declarations: [
    AdminTrainingUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminTrainingUpdateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MaterialModule
  ]
})
export class AdminTrainingUpdateModule { }
