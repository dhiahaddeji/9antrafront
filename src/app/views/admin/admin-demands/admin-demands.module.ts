import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDemandsRoutingModule } from './admin-demands-routing.module';
import { AdminDemandsListComponent } from './admin-demands-list/admin-demands-list.component';


@NgModule({
  declarations: [
    AdminDemandsListComponent
  ],
  imports: [
    CommonModule,
    AdminDemandsRoutingModule
  ]
})
export class AdminDemandsModule { }
