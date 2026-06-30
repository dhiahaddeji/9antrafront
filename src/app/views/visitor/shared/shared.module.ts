import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { HelpComponent } from './help/help.component';
import { ContactForumComponent } from './contact-forum/contact-forum.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoaderComponent,
    HelpComponent,
    ContactForumComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoaderComponent,
    HelpComponent,
    ContactForumComponent
  ]
})
export class SharedModule { }
