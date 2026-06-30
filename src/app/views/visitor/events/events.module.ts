import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EventsListComponent,
    EventPageComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ],
})
export class EventsModule { }
