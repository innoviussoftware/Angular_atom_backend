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
      co_instructors: ['', Validators.required],
      image: [null, Validators.required]
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
  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.addForm.get('image').setValue(file);
      console.log(this.addForm.value);
    }
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
    const formModel = this.prepareSave();
    $('#submit_btn').prop('disabled', true);
    this.webinarService.storeWebinar(formModel)
      .subscribe(webinar => this.webinar = webinar, error => { }, () => $('#submit_btn').prop('disabled', false));
  }

  private prepareSave(): any {
    let input = new FormData();

    // This can be done a lot prettier; for example automatically assigning values by looping through `this.addForm.controls`, but we'll keep it as simple as possible here
    input.append('title', this.addForm.get('title').value);
    input.append('instructors', this.addForm.get('instructors').value);
    let ids = this.addForm.get('co_instructors').value;
    for (var i = 0; i < ids.length; i++) {
      input.append('co_instructors[]', ids[i].id);
    }
    input.append('date_time', this.addForm.get('date_time').value);
    input.append('url', this.addForm.get('url').value);
    input.append('course_id', this.addForm.get('course_id').value);
    input.append('user_id', this.addForm.get('user_id').value);
    input.append('short_description', this.addForm.get('short_description').value);
    input.append('long_description', this.addForm.get('long_description').value);
    input.append('image', this.addForm.get('image').value);
    return input;
  }

}
