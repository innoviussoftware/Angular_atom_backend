import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CourseService} from '../course.service'
import { Course } from '../course'


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  // styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;

  constructor( private route: ActivatedRoute, private courseService: CourseService) { }
  ngOnInit() {
    this.getCourse();
  }

  getCourse(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);
  }
}
