import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { CourseRoutingModule } from './course-routing.module';
import { CoursegridComponent } from './coursegrid/coursegrid.component';
import { CourseComponent } from './course/course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ChapterComponent } from './chapter/chapter.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [
    CoursegridComponent,
    CourseComponent,
    AddCourseComponent,
    EditCourseComponent,
    ChapterComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    RouterModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
})

export class CourseModule { }
