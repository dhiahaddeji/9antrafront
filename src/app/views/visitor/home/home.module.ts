import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HeroSectionComponent } from './home/hero-section/hero-section.component';
import { NumbersSectionComponent } from './home/numbers-section/numbers-section.component';
import { ServiceSectionComponent } from './home/service-section/service-section.component';
import { TreamSectionComponent } from './home/tream-section/tream-section.component';
import { FormSectionComponent } from './home/form-section/form-section.component';
import { TestimonialsSectionComponent } from './home/testimonials-section/testimonials-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HackerspaceSectionComponent } from './home/hackerspace-section/hackerspace-section.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    NumbersSectionComponent,
    ServiceSectionComponent,
    TreamSectionComponent,
    FormSectionComponent,
    TestimonialsSectionComponent,
    HackerspaceSectionComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports:[FormSectionComponent]
})
export class HomeModule { }
