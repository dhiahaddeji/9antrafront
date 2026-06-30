import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventFormRoutingModule } from './event-form-routing.module';
import { EventFormComponent } from './event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventFormRoutingModule
  ]
})
export class EventFormModule { }
