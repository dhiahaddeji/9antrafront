import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRecordsComponent } from './student-records/student-records.component';

const routes: Routes = [
  {path:'',component:StudentRecordsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRecordsRoutingModule { }
