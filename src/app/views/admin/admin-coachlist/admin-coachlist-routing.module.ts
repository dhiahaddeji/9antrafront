import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoachlistComponent } from './admin-coachlist/admin-coachlist.component';
import { ResumecoachComponent } from './admin-coachlist/resumecoach/resumecoach.component';


const routes: Routes = [
{path:'',component:AdminCoachlistComponent},
{path:'resumecoach/:id',component:ResumecoachComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCoachlistRoutingModule { }
