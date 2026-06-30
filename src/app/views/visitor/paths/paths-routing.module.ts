import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathsListComponent } from './paths-list/paths-list.component';
import { PathDetailsComponent } from './path-details/path-details.component';
import { PathContactComponent } from './path-contact/path-contact.component';

const routes: Routes = [
  {path: '', component:PathsListComponent},
  {path: 'details/:id', component:PathDetailsComponent},
  {path: 'contact/:id', component:PathContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PathsRoutingModule { }
