import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AdminCreateAccountRoutingModule } from './admin-create-account-routing.module';
import { AdminCreateAccountComponent } from './admin-create-account.component';

@NgModule({
  declarations: [AdminCreateAccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AdminCreateAccountRoutingModule,
  ]
})
export class AdminCreateAccountModule {}
