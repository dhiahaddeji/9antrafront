import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCandidacyComponent } from './add-candidacy.component';


const routes: Routes = [
  {path:'',component:AddCandidacyComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCandidacyRoutingModule { }
