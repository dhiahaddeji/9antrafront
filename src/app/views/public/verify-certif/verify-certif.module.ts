import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VerifyCertifComponent } from './verify-certif.component';

const routes: Routes = [{ path: '', component: VerifyCertifComponent }];

@NgModule({
  declarations: [VerifyCertifComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule]
})
export class VerifyCertifModule {}
