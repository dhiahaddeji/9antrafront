import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupsRoutingModule } from './admin-groups-routing.module';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminGroupsComponent],
  imports: [
    CommonModule,
    AdminGroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminGroupsModule {}
