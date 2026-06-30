import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentQuizPlayComponent } from './student-quiz-play.component';

const routes: Routes = [{ path: '', component: StudentQuizPlayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentQuizPlayRoutingModule { }
