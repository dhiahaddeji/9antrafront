import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieformComponent } from './categorieform/categorieform.component';

const routes: Routes = [
  {path:'',component:CategorieformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieformRoutingModule { }
