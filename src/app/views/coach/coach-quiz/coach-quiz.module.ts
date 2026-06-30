import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachQuizRoutingModule } from './coach-quiz-routing.module';
import { CoachQuizComponent } from './coach-quiz/coach-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/materiel/materiel.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    CoachQuizComponent
  ],
  imports: [
    CommonModule,
    CoachQuizRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MaterialModule
  ]
})
export class CoachQuizModule { }
