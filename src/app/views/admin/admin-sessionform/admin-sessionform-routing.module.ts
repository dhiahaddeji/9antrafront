import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSessionformComponent } from './admin-sessionform/admin-sessionform.component';

const routes: Routes = [
  {path:'',component:AdminSessionformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSessionformRoutingModule { }
