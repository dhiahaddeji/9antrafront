import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHacherspacesRoutingModule } from './admin-hacherspaces-routing.module';
import { AdminHackerspacesComponent } from './admin-hackerspaces/admin-hackerspaces.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminHackerspacesComponent
  ],
  imports: [
    CommonModule,
    AdminHacherspacesRoutingModule,FormsModule
  ]
})
export class AdminHacherspacesModule { }
