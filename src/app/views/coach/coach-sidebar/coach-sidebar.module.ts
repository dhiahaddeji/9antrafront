import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachSidebarRoutingModule } from './coach-sidebar-routing.module';
import { CoachSidebarComponent } from './coach-sidebar/coach-sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoachSidebarComponent
  ],
  imports: [
    CommonModule,
    CoachSidebarRoutingModule,
    FormsModule
  ]
})
export class CoachSidebarModule { }
