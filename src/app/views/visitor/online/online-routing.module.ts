import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineComponent } from './online/online.component';
import { compileClassMetadata } from '@angular/compiler';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';

const routes: Routes = [
  {path:'',component:OnlineComponent},
  {path:'courseDetails/:id', component:CourseDetailsComponent},
  {path:'course/:idCourse/lesson/:idLesson', component:LessonsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineRoutingModule { }
