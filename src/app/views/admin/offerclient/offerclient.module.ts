import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferclientRoutingModule } from './offerclient-routing.module';
import { OfferclientComponent } from './offerclient.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OfferclientComponent
  ],
  imports: [
    CommonModule,FormsModule,
    OfferclientRoutingModule
  ]
})
export class OfferclientModule { }
