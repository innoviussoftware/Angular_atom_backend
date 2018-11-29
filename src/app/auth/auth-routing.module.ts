import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';


const AUTH_ROUTES: Routes = [
  {path : 'login', component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(AUTH_ROUTES)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
