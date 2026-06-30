import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProjectownerRoutingModule } from './admin-projectowner-routing.module';
import { AdminProjectownerComponent } from './admin-projectowner/admin-projectowner.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminProjectownerComponent
  ],
  imports: [
    FormsModule,

    CommonModule,
    AdminProjectownerRoutingModule
  ]
})
export class AdminProjectownerModule { }
