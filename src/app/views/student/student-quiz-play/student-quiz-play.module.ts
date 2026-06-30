import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentQuizPlayRoutingModule } from './student-quiz-play-routing.module';
import { StudentQuizPlayComponent } from './student-quiz-play.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/materiel/materiel.module';


@NgModule({
  declarations: [
    StudentQuizPlayComponent
  ],
  imports: [
    CommonModule,
    StudentQuizPlayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MaterialModule
  ]
})
export class StudentQuizPlayModule { }
