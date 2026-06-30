import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminMessagesRoutingModule } from './admin-messages-routing.module';
import { AdminMessagesComponent } from './admin-messages.component';

@NgModule({
  declarations: [AdminMessagesComponent],
  imports: [CommonModule, FormsModule, RouterModule, AdminMessagesRoutingModule],
})
export class AdminMessagesModule {}
