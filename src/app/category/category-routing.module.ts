import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { LayoutComponent } from '../layout/layout.component'
import { CheckAuth } from '../auth/check-auth.guard';


const CATEGORIES_ROUTES: Routes = [
  {
      path: 'categories',
      component: LayoutComponent,
      canActivate:[CheckAuth],
      children: [
        {path : '', component : CategoriesComponent},
        {path : 'add', component : AddCategoryComponent},
      ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(CATEGORIES_ROUTES)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
