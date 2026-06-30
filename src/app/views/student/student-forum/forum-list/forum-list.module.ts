import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumListRoutingModule } from './forum-list-routing.module';
import { ForumListComponent } from './forum-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForumListComponent
  ],
  imports: [
    CommonModule,
    ForumListRoutingModule,
    FormsModule
  ]
})
export class ForumListModule { }
