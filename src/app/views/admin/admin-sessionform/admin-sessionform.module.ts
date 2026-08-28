import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminSessionformRoutingModule } from './admin-sessionform-routing.module';
import { AdminSessionformComponent } from './admin-sessionform/admin-sessionform.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminSessionformComponent
  ],
  imports: [
    CommonModule,
    AdminSessionformRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class AdminSessionformModule { }
