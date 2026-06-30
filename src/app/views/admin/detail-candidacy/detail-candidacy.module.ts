import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCandidacyRoutingModule } from './detail-candidacy-routing.module';
import { DetailCandidacyComponent } from './detail-candidacy.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailCandidacyComponent
  ],
  imports: [
    CommonModule,FormsModule,
    DetailCandidacyRoutingModule
  ]
})
export class DetailCandidacyModule { }
