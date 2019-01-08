import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Webinar } from "../webinar";
import { User } from '../../user/user';
import { WebinarService } from "../webinar.service";

declare var $: any;

@Component({
  selector: 'app-add-webinar',
  templateUrl: './add-webinar.component.html',
  styleUrls: ['./add-webinar.component.css']
})
export class AddWebinarComponent implements OnInit {

  addForm: FormGroup;
  webinar: Webinar;
  isDisabled = false;
  users = [];
  courses = [];
  auth_user = JSON.parse(localStorage.getItem("auth_user"));
  instructor = (this.auth_user.role == 'instructor') ? this.auth_user.id : '';
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private formBuilder: FormBuilder, private webinarService: WebinarService) { }

  ngOnInit() {
    this.getInstructors();
    this.getCourses();
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      date_time: ['', Validators.required],
      url: ['', Validators.required],
      instructors: [this.instructor, Validators.required],
      short_description: ['', Validators.required],
      long_description: ['', Validators.required],
      user_id: [this.auth_user.id, Validators.required],
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
    $('#submit_btn').prop('disabled', true);
    this.webinarService.storeWebinar(this.addForm.value)
      .subscribe(webinar => this.webinar = webinar, error => { }, () => $('#submit_btn').prop('disabled', false));
  }

}
