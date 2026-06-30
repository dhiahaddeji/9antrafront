import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventUpdateFormComponent } from './event-update-form/event-update-form.component';

const routes: Routes = [
  {path: '', component:EventUpdateFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventUpdateFormRoutingModule { }
