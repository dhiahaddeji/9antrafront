import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';

const routes: Routes = [
  { path: '', component: CoachProfileComponent },
  { path: 'Edit', loadChildren: () => import('../coach-editprofile/coach-editprofile.module').then(m => m.CoachEditprofileModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachProfileRoutingModule { }
