import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachForumComponent } from './coach-forum.component';

const routes: Routes = [{ path: '', component: CoachForumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachForumRoutingModule { }
