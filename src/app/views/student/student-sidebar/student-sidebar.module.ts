import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentSidebarRoutingModule } from './student-sidebar-routing.module';
import { StudentSidebarComponent } from './student-sidebar/student-sidebar.component';
import { NotificationModule } from '../../visitor/notification/notification.module';



@NgModule({
  declarations: [
    StudentSidebarComponent
  ],
  imports: [
    CommonModule,
    StudentSidebarRoutingModule,
    NotificationModule
  ]
})
export class StudentSidebarModule { }
