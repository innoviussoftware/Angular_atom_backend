import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from '../layout/layout.component';
import { AddWebinarComponent } from './add-webinar/add-webinar.component';
import { EditWebinarComponent } from './edit-webinar/edit-webinar.component';
import { WebinarsComponent } from './webinars/webinars.component';
import { CheckAuth } from '../auth/check-auth.guard';

const WEBINAR_ROUTES: Routes = [
  {
      path: 'webinars',
      component: LayoutComponent,
      canActivate:[CheckAuth],
      children: [
        {path : '', component : WebinarsComponent},
        {path : 'add', component : AddWebinarComponent},
        {path : 'edit/:id/details', component : EditWebinarComponent}
      ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(WEBINAR_ROUTES)],
  exports: [RouterModule]
})
export class WebinarRoutingModule { }
