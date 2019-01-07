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

  constructor(private formBuilder: FormBuilder, private webinarService: WebinarService) { }

  ngOnInit() {
    this.getInstructors();
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      date_time: ['', Validators.required],
      url: ['', Validators.required],
      instructors: ['', Validators.required],
      short_description: ['', Validators.required],
      long_description: ['', Validators.required]
    });
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
