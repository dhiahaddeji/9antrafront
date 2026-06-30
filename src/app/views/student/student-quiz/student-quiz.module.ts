import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentQuizRoutingModule } from './student-quiz-routing.module';
import { StudentQuizComponent } from './student-quiz/student-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/materiel/materiel.module';




@NgModule({
  declarations: [
    StudentQuizComponent
  ],
  imports: [
    CommonModule,
    StudentQuizRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MaterialModule
  ]
})
export class StudentQuizModule { }
