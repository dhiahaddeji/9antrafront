import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentEditprofileComponent } from './student-editprofile/student-editprofile.component';

const routes: Routes = [
  {path:'',component:StudentEditprofileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentEditprofileRoutingModule { }
