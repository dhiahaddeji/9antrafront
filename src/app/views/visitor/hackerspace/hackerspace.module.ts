import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackerspaceRoutingModule } from './hackerspace-routing.module';
import { HackerspaceComponent } from './hackerspace/hackerspace.component';
import { HomeModule } from '../home/home.module';
import { SafeUrlPipe } from './hackerspace/SafeUrlPipe';
import { SafePipeModule } from 'safe-pipe';


@NgModule({
  declarations: [
    HackerspaceComponent,SafeUrlPipe
  ],
  imports: [
    CommonModule,
    HackerspaceRoutingModule,
    HomeModule,
    SafePipeModule

  ]
})
export class HackerspaceModule { }
