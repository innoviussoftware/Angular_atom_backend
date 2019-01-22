import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-coursegrid',
  templateUrl: './coursegrid.component.html',
  // styleUrls: ['./coursegrid.component.css']
})
export class CoursegridComponent implements OnInit {
  courses = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  updateFeatured(featured,course_id){      
      this.courseService.updateFeatured(course_id,featured)
        .subscribe(courses => {
            this.getCourses();
        });
  }

}
