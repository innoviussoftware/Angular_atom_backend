import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Webinar } from "../webinar";
import { User } from '../../user/user';
import { WebinarService } from "../webinar.service";

declare var $: any;

@Component({
  selector: 'app-edit-webinar',
  templateUrl: './edit-webinar.component.html',
  styleUrls: ['./edit-webinar.component.css']
})
export class EditWebinarComponent implements OnInit {

  editForm: FormGroup;
  webinar: Webinar;
  isDisabled = false;
  users = [];
  id: number;
  courses = [];
  auth_user = JSON.parse(localStorage.getItem("auth_user"));
  instructor = (this.auth_user.role == 'instructor') ? this.auth_user.id : '';
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];

  constructor(private formBuilder: FormBuilder, private webinarService: WebinarService, private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getInstructors();
    this.getCourses();
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      date_time: ['', Validators.required],
      url: ['', Validators.required],
      instructors: [this.instructor, Validators.required],
      short_description: ['', Validators.required],
      long_description: ['', Validators.required],
      user_id: ['', Validators.required],
      course_id: ['', Validators.required],
      co_instructors: ['', Validators.required]
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Remove All',
      allowSearchFilter: true
    };
    this.webinarService.getWebinar(this.id)
      .subscribe(webinar => {
        delete webinar.status;
        delete webinar.created_at;
        delete webinar.updated_at;
        this.editForm.setValue(webinar);
      });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  getCourses(): void {
    this.webinarService.getCourses()
      .subscribe(courses => this.courses = courses);
  }
  getInstructors(): void {
    this.webinarService.getInstructors()
      .subscribe(users => this.users = users);
  }

  onSubmit() {
    this.webinarService.updateWebinar(this.editForm.value, this.id)
      .subscribe(webinar => this.webinar = webinar);
  }
}