import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCandidacyComponent } from './detail-candidacy.component';

const routes: Routes = [
  {path:'',component:DetailCandidacyComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailCandidacyRoutingModule { }
