import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateAccountComponent } from './admin-create-account.component';

const routes: Routes = [{ path: '', component: AdminCreateAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCreateAccountRoutingModule {}
