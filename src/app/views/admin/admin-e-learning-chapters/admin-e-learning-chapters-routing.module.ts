import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterAddFormComponent } from './chapter-add-form/chapter-add-form.component';

const routes: Routes = [
  {path: '', component:ChapterListComponent},
  {path:'add', component:ChapterAddFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminELearningChaptersRoutingModule { }
