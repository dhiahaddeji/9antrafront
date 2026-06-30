import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PathsRoutingModule } from './paths-routing.module';
import { PathsListComponent } from './paths-list/paths-list.component';
import { PathDetailsComponent } from './path-details/path-details.component';
import { SharedModule } from '../shared/shared.module';
import { PathContactComponent } from './path-contact/path-contact.component';


@NgModule({
  declarations: [
    PathsListComponent,
    PathDetailsComponent,
    PathContactComponent
  ],
  imports: [
    CommonModule,
    PathsRoutingModule,
    SharedModule
  ]
})
export class PathsModule { }
