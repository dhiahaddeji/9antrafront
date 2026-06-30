import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGroupcalendarComponent } from './admin-groupcalendar/admin-groupcalendar.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: AdminGroupcalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class AdminGroupcalendarRoutingModule {}
