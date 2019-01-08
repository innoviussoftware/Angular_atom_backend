import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursegridComponent } from './coursegrid/coursegrid.component';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ChapterComponent } from './chapter/chapter.component';

import { LayoutComponent } from '../layout/layout.component';

import { CheckAuth } from '../auth/check-auth.guard';

const COURSES_ROUTES: Routes = [
  {
      path: 'courses',
      component: LayoutComponent,
      canActivate:[CheckAuth],
      children: [
        {path : '', component : CoursegridComponent},
        {path : 'add', component : AddCourseComponent},
        {path : ':id', component : CourseComponent},
        {path : 'edit/:id/details', component : EditCourseComponent},
        {path : 'edit/:id/chapters', component : ChapterComponent},
      ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(COURSES_ROUTES)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
