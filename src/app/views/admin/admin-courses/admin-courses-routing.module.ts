import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoursesListComponent } from './admin-courses-list/admin-courses-list.component';
import { AdminCourseAddFormComponent } from './admin-course-add-form/admin-course-add-form.component';
import { AdminCourseDetailsComponent } from './admin-course-details/admin-course-details.component';
import { AdminCourseUpdateFormComponent } from './admin-course-update-form/admin-course-update-form.component';

const routes: Routes = [
  {path: '', component:AdminCoursesListComponent},
  {path: 'addForm', component:AdminCourseAddFormComponent},
  {path:'update/:id', component: AdminCourseUpdateFormComponent},
  {path:'details/:id', component:AdminCourseDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCoursesRoutingModule { }
