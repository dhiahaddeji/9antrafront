import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {path: '', component:EventPageComponent},
  {path:'eventDetails/:id', component:EventDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
