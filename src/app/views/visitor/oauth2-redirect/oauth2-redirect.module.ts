import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuth2RedirectRoutingModule } from './oauth2-redirect-routing.module';
import { OAuth2RedirectComponent } from './oauth2-redirect.component';

@NgModule({
  declarations: [OAuth2RedirectComponent],
  imports: [CommonModule, OAuth2RedirectRoutingModule]
})
export class OAuth2RedirectModule {}
