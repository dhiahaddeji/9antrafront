import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachQuizFormComponent } from './coach-quiz-form/coach-quiz-form.component';


const routes: Routes = [{ path: '', component: CoachQuizFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachQuizFormRoutingModule { }
