import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDemandsListComponent } from './admin-demands-list/admin-demands-list.component';

const routes: Routes = [
  {path: '', component:AdminDemandsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDemandsRoutingModule { }
