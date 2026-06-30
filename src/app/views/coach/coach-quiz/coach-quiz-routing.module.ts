import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachQuizComponent } from './coach-quiz/coach-quiz.component';

const routes: Routes = [{ path: '', component: CoachQuizComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachQuizRoutingModule { }
