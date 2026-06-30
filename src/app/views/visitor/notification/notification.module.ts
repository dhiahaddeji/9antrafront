import { NgModule , } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from '../../visitor/notification/notification.component';


@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, FormsModule , RouterModule],
  exports:[NotificationComponent],
})
export class NotificationModule {}
