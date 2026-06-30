import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachHomeRoutingModule } from './coach-home-routing.module';
import { CoachHomeComponent } from './coach-home/coach-home.component';


@NgModule({
  declarations: [
    CoachHomeComponent
  ],
  imports: [
    CommonModule,
    CoachHomeRoutingModule
  ]
})
export class CoachHomeModule { }
