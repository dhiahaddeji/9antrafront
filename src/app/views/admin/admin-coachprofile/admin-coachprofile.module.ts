import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCoachprofileRoutingModule } from './admin-coachprofile-routing.module';
import { AdminCoachprofileComponent } from './admin-coachprofile/admin-coachprofile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminCoachprofileComponent],
  imports: [CommonModule, AdminCoachprofileRoutingModule, FormsModule],
})
export class AdminCoachprofileModule {}
