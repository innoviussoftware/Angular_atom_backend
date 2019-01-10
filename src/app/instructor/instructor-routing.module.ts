import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorlistComponent } from './instructorlist/instructorlist.component';
import { InstructorComponent } from './instructor/instructor.component';
import { LayoutComponent } from '../layout/layout.component'
import { CheckAuth } from '../auth/check-auth.guard';


const INSTRUCTORS_ROUTES: Routes = [
  {
      path: 'instructors',
      component: LayoutComponent,
      canActivate:[CheckAuth],
      children: [
        {path : '', component : InstructorlistComponent},
        {path : ':id', component : InstructorComponent}
        // {path : 'add', component : AddCategoryComponent},
      ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(INSTRUCTORS_ROUTES)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
