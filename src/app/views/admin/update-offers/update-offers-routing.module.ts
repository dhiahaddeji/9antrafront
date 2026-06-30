import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateOffersComponent } from './update-offers.component';

const routes: Routes = [
  {path:'',component:UpdateOffersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateOffersRoutingModule { }
