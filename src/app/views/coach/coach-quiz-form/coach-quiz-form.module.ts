import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachQuizFormRoutingModule } from './coach-quiz-form-routing.module';
import { CoachQuizFormComponent } from './coach-quiz-form/coach-quiz-form.component';
import { MaterialModule } from 'src/app/materiel/materiel.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    CoachQuizFormComponent
  ],
  imports: [
    CommonModule,
    CoachQuizFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MaterialModule
  ]
})
export class CoachQuizFormModule { }
