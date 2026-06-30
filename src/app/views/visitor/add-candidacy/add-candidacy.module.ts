import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCandidacyRoutingModule } from './add-candidacy-routing.module';
import { AddCandidacyComponent } from './add-candidacy.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCandidacyComponent
  ],
  imports: [
    CommonModule,FormsModule,
    AddCandidacyRoutingModule
  ]
})
export class AddCandidacyModule { }
