import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPathsRoutingModule } from './admin-paths-routing.module';
import { AdminPathsListComponent } from './admin-paths-list/admin-paths-list.component';
import { AdminPathsAddFormComponent } from './admin-paths-add-form/admin-paths-add-form.component';
import { AdminPathsUpdateFormComponent } from './admin-paths-update-form/admin-paths-update-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPathDetailsComponent } from './admin-path-details/admin-path-details.component';


@NgModule({
  declarations: [
    AdminPathsListComponent,
    AdminPathsAddFormComponent,
    AdminPathsUpdateFormComponent,
    AdminPathDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminPathsRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminPathsModule { }
