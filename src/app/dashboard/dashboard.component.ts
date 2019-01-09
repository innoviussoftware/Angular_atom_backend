import { Component, OnInit } from '@angular/core';

import { DashboardService } from './dashboard.service'
import { Course } from '../course/course';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courses:Course[];
  users:any[];
  course_count:number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboard()
      .subscribe(dashboard => {
        this.courses = dashboard.courses;
        this.course_count = dashboard.course_count;
        this.users = dashboard.users;
        console.log(dashboard.courses);
      });
  }

}
