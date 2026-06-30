import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHackerspacesUpdateRoutingModule } from './admin-hackerspaces-update-routing.module';
import { AdminHackerspacesUpdateComponent } from './admin-hackerspaces-update/admin-hackerspaces-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminHackerspacesUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminHackerspacesUpdateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminHackerspacesUpdateModule { }
