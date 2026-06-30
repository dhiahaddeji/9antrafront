import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoachprofileComponent } from './admin-coachprofile/admin-coachprofile.component';

const routes: Routes = [
  { path: 'profile/:id', component: AdminCoachprofileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCoachprofileRoutingModule {}
