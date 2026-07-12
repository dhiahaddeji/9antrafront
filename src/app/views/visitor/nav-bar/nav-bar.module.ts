import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBarRoutingModule } from './nav-bar-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotificationModule } from '../notification/notification.module';
import { LanguageToggleComponent } from './language-toggle/language-toggle.component';



@NgModule({
  declarations: [
    NavBarComponent,
    LanguageToggleComponent
  ],
  imports: [
    CommonModule,
    NavBarRoutingModule,
    RouterModule,
    NotificationModule
  ],
  exports:[NavBarComponent, LanguageToggleComponent]
})
export class NavBarModule { }
