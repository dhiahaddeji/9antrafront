import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLessonsListComponent } from './admin-lessons-list/admin-lessons-list.component';
import { AdminLessonsAddFormComponent } from './admin-lessons-add-form/admin-lessons-add-form.component';

const routes: Routes = [
  {path: '', component:AdminLessonsListComponent},
  {path:'add', component: AdminLessonsAddFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLessonsRoutingModule { }
