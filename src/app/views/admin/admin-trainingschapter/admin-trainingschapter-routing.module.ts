import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTrainingschapterComponent } from './admin-trainingschapter/admin-trainingschapter.component';
import { AdminChaptersComponent } from '../admin-chapters/admin-chapters.component';

const routes: Routes = [
  {path:'Add',component:AdminTrainingschapterComponent},
  {path:'list',component:AdminChaptersComponent},
  {path:'',redirectTo:'list',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTrainingschapterRoutingModule { }
