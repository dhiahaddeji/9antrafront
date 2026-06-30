import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventUpdateFormRoutingModule } from './event-update-form-routing.module';
import { EventUpdateFormComponent } from './event-update-form/event-update-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventUpdateFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EventUpdateFormRoutingModule
  ]
})
export class EventUpdateFormModule { }
