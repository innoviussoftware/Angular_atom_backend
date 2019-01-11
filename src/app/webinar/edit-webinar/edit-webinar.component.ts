import { Component, ViewChild, OnInit } from '@angular/core';
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
  co_users = [];
  id: number;
  courses = [];
  auth_user = JSON.parse(localStorage.getItem("auth_user"));
  instructor = (this.auth_user.role == 'instructor') ? this.auth_user.id : '';
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  image_upload = new FormData();
  today: Date;

  @ViewChild("fileInput") fileInput;

  constructor(private formBuilder: FormBuilder, private webinarService: WebinarService, private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.today = new Date();
  }

  ngOnInit() {
    this.getInstructors(0);
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
    this.webinarService.getWebinar(this.id)
      .subscribe(webinar => {
        delete webinar.status;
        delete webinar.created_at;
        delete webinar.updated_at;
        alert(new Date(webinar.date_time));
        this.editForm.setValue(webinar);
        this.editForm.controls['long_description'].setValue(webinar.long_description);
        this.editForm.controls['image'].setValue(webinar.image);
        this.editForm.controls['date_time'].setValue(new Date(webinar.date_time));
        this.getCoInstructors(webinar.instructors);
      });


  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onSelectChange(event) {
    let not_user = event.target.value;
    this.getCoInstructors(not_user);
  }
  getCourses(): void {
    this.webinarService.getCourses()
      .subscribe(courses => this.courses = courses);
  }
  getInstructors(not_user): void {
    this.webinarService.getInstructors(not_user)
      .subscribe(users => this.users = users);
  }
  getCoInstructors(not_user): void {
    this.webinarService.getInstructors(not_user)
      .subscribe(co_users => this.co_users = co_users);
  }
  onSubmit() {
    let sdate = new Date(this.editForm.get('date_time').value);
    let date_format:string = sdate.getFullYear()+"-"+(sdate.getMonth() + 1)+"-"+sdate.getDate()+" "+sdate.getHours()+":"+sdate.getMinutes()+":"+sdate.getSeconds();
    this.editForm.controls['date_time'].setValue(date_format);

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      let input = new FormData();
      input.append("image", fileToUpload);
      this.webinarService.file_upload(input)
        .subscribe(file_upload => {
          this.editForm.controls['image'].setValue(file_upload.path);
          this.webinarService.updateWebinar(this.editForm.value, this.id)
            .subscribe(webinar => this.webinar = webinar);
        });
    } else {
      this.editForm.controls['image'].setValue(null);
      this.webinarService.updateWebinar(this.editForm.value, this.id)
        .subscribe(webinar => this.webinar = webinar);
    }
  }

  onFileChange(event) {
    this.image_upload.delete('image');
    if (event.target.files.length > 0) {
      let files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        this.image_upload.append("image", files[i]);
      }
    }
  }
}
