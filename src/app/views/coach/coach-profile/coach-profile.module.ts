import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachProfileRoutingModule } from './coach-profile-routing.module';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoachProfileComponent
  ],
  imports: [
    CommonModule,
    CoachProfileRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class CoachProfileModule { }
