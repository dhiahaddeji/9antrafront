import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSidebarRoutingModule } from './admin-sidebar-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { NotificationModule } from '../../visitor/notification/notification.module';


@NgModule({
  declarations: [
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    AdminSidebarRoutingModule,
    NotificationModule
  ],
  exports: [
    AdminSidebarComponent
  ]
})
export class AdminSidebarModule { }
