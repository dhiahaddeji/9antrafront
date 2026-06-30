import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAllprojectclientsRoutingModule } from './admin-allprojectclients-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminAllprojectclientsComponent } from '../admin-allprojectclients.component';


@NgModule({
  declarations: [AdminAllprojectclientsComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminAllprojectclientsRoutingModule
  ]
})
export class AdminAllprojectclientsModule { }
