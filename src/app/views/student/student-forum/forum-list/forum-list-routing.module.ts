import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumListComponent } from './forum-list.component';

const routes: Routes = [{ path: '', component: ForumListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumListRoutingModule { }
