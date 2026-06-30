import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStudentprofileComponent } from './admin-studentprofile/admin-studentprofile.component';

const routes: Routes = [
  { path: 'profile/:id', component: AdminStudentprofileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminStudentprofileRoutingModule {}
