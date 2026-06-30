import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCompanyComponent } from './update-company.component';

const routes: Routes = [
  {path:'',component:UpdateCompanyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateCompanyRoutingModule { }
