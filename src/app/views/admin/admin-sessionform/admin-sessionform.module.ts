import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSessionformRoutingModule } from './admin-sessionform-routing.module';
import { AdminSessionformComponent } from './admin-sessionform/admin-sessionform.component';
import { FormGroup, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminSessionformComponent
  ],
  imports: [
    CommonModule,
    AdminSessionformRoutingModule,
    
    FormsModule,
  ]
})
export class AdminSessionformModule { }
