import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportsListComponent } from './admin-reports-list/admin-reports-list.component';
import { AdminReportsAddFormComponent } from './admin-reports-add-form/admin-reports-add-form.component';
import { AdminReportsUpdateFormComponent } from './admin-reports-update-form/admin-reports-update-form.component';

const routes: Routes = [
  {path: '', component:AdminReportsListComponent},
  {path:'add', component:AdminReportsAddFormComponent},
  {path:'update/:id', component:AdminReportsUpdateFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReportsRoutingModule { }
