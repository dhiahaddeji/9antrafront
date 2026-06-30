import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';

const routes: Routes = [
  {path:'',component:AdminFeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFeedbackRoutingModule { }
