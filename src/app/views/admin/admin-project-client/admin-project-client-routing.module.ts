import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProjectClientComponent } from './admin-project-client.component';

const routes: Routes = [
  {path:'',component:AdminProjectClientComponent}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProjectClientRoutingModule { }
