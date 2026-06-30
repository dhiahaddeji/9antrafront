import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAllprojectclientsComponent } from '../admin-allprojectclients.component';

const routes: Routes = [

  {path:'',component:AdminAllprojectclientsComponent}
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAllprojectclientsRoutingModule { }
