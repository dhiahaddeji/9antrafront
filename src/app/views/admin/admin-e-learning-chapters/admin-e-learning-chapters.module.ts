import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminELearningChaptersRoutingModule } from './admin-e-learning-chapters-routing.module';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterAddFormComponent } from './chapter-add-form/chapter-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChapterListComponent,
    ChapterAddFormComponent
  ],
  imports: [
    CommonModule,
    AdminELearningChaptersRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminELearningChaptersModule { }
