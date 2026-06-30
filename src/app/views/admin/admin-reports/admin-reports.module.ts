import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminReportsRoutingModule } from './admin-reports-routing.module';
import { AdminReportsListComponent } from './admin-reports-list/admin-reports-list.component';
import { AdminReportsAddFormComponent } from './admin-reports-add-form/admin-reports-add-form.component';
import { AdminReportsUpdateFormComponent } from './admin-reports-update-form/admin-reports-update-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminReportsListComponent,
    AdminReportsAddFormComponent,
    AdminReportsUpdateFormComponent
  ],
  imports: [
    CommonModule,
    AdminReportsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AdminReportsModule { }
