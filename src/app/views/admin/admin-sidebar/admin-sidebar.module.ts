import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSidebarRoutingModule } from './admin-sidebar-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    AdminSidebarRoutingModule
  ],
  exports: [
    AdminSidebarComponent
  ]
})
export class AdminSidebarModule { }
