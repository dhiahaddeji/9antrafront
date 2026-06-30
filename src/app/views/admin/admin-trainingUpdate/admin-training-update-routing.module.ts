import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTrainingUpdateComponent } from './admin-training-update/admin-training-update.component';

const routes: Routes = [{ path: '', component: AdminTrainingUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTrainingUpdateRoutingModule { }
