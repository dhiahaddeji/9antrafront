import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackerspaceComponent } from './hackerspace/hackerspace.component';

const routes: Routes = [
  {path:'',component:HackerspaceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HackerspaceRoutingModule { }
