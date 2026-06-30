import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidacyComponent } from './candidacy.component';

const routes: Routes = [
  {path:'',component:CandidacyComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidacyRoutingModule { }
