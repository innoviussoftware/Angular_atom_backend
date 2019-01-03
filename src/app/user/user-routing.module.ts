import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlistComponent } from './userlist/userlist.component';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from '../layout/layout.component'
import { CheckAuth } from '../auth/check-auth.guard';


const USERS_ROUTES: Routes = [
  {
      path: 'users',
      component: LayoutComponent,
      canActivate:[CheckAuth],
      children: [
        {path : '', component : UserlistComponent},
        {path : ':id', component : UserComponent}
        // {path : 'add', component : AddCategoryComponent},
      ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(USERS_ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
