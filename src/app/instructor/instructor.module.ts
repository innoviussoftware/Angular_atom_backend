import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorlistComponent } from './instructorlist/instructorlist.component';
import { InstructorComponent } from './instructor/instructor.component';

@NgModule({
  declarations: [
    InstructorlistComponent,
    InstructorComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { }
