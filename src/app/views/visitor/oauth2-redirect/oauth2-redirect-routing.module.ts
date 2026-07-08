import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OAuth2RedirectComponent } from './oauth2-redirect.component';

const routes: Routes = [
  { path: '', component: OAuth2RedirectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OAuth2RedirectRoutingModule {}
