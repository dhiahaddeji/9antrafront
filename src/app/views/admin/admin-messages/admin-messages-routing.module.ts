import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMessagesComponent } from './admin-messages.component';

const routes: Routes = [{ path: '', component: AdminMessagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMessagesRoutingModule {}
