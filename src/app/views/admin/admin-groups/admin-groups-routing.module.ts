import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';

const routes: Routes = [
  { path: '', component: AdminGroupsComponent },
  { path: 'records', loadChildren: () => import('../admin-grouprecords/admin-grouprecords.module').then(m => m.AdminGrouprecordsModule) },
  { path: 'calendar', loadChildren: () => import('../admin-groupcalendar/admin-groupcalendar.module').then(m => m.AdminGroupcalendarModule) },
  { path: 'Members', loadChildren: () => import('../admin-groupmembers/admin-groupmembers.module').then(m => m.AdminGroupmembersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGroupsRoutingModule { }
