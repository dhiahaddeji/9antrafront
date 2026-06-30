import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPathsListComponent } from './admin-paths-list/admin-paths-list.component';
import { AdminPathsAddFormComponent } from './admin-paths-add-form/admin-paths-add-form.component';
import { AdminPathsUpdateFormComponent } from './admin-paths-update-form/admin-paths-update-form.component';
import { AdminPathDetailsComponent } from './admin-path-details/admin-path-details.component';

const routes: Routes = [
  {path: '', component:AdminPathsListComponent},
  {path: 'add', component:AdminPathsAddFormComponent},
  {path: 'update/:id', component:AdminPathsUpdateFormComponent},
  {path: 'details/:id', component:AdminPathDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPathsRoutingModule { }
