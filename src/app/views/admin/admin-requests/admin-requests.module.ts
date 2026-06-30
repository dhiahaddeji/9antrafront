import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRequestsRoutingModule } from './admin-requests-routing.module';
import { AdminRequestListComponent } from './admin-request-list/admin-request-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../visitor/shared/shared.module';


@NgModule({
  declarations: [
    AdminRequestListComponent
  ],
  imports: [
    CommonModule,
    AdminRequestsRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminRequestsModule { }
