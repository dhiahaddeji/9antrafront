import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes: Routes = [
  { path: '', component: StudentProfileComponent },
  { path: 'Edit', loadChildren: () => import('../student-editprofile/student-editprofile.module').then(m => m.StudentEditprofileModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentProfileRoutingModule { }
