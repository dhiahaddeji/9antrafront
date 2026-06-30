import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFeedbackRoutingModule } from './admin-feedback-routing.module';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';

@NgModule({
  declarations: [
    AdminFeedbackComponent,
    // Add the comma here
  ],
  imports: [CommonModule, AdminFeedbackRoutingModule],
})
export class AdminFeedbackModule {}
