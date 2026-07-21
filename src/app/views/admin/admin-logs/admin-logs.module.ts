import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminLogsComponent } from './admin-logs.component';

const routes: Routes = [{ path: '', component: AdminLogsComponent }];

@NgModule({
  declarations: [AdminLogsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule]
})
export class AdminLogsModule {}
