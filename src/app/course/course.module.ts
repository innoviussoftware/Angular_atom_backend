import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { CourseRoutingModule } from './course-routing.module';
import { CoursegridComponent } from './coursegrid/coursegrid.component';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { MaterialComponent } from './material/material.component';


@NgModule({
  declarations: [
    CoursegridComponent,
    CourseComponent,
    AddCourseComponent,
    EditCourseComponent,
    MaterialComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})

export class CourseModule { }
