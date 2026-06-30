import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidacyRoutingModule } from './candidacy-routing.module';
import { CandidacyComponent } from './candidacy.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidacyComponent
  ],
  imports: [
    CommonModule,FormsModule,
    CandidacyRoutingModule
  ]
})
export class CandidacyModule { }
