import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CourseService } from '../course.service'
import { CategoryService } from '../../category/category.service';
import { Course } from '../course';

import { User } from '../../user/user';
import { WebinarService } from "../../webinar/webinar.service";
declare var $: any;


@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  // styleUrls: ['./course.component.css']
})
export class EditCourseComponent implements OnInit {
  course: Course;
  categories: any[];
  editForm: FormGroup;
  id: number;
  users: User[];
  co_users: User[];
  dropdownSettings = {};
  dropdownList = [];
  selectedItems = [];
  primary_instructor_id;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private webinarService: WebinarService,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
    this.getInstructors(0);

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      primary_instructor_id: ['', Validators.required],
      co_instructors: ['', Validators.required],
      category_id: ['', Validators.required],
      name: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      duration_units: ['', Validators.required],
      long_description: ['', Validators.required],
      short_description: ['', Validators.required],
      image: [null, Validators.required],
      status: ['0', Validators.required],
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Remove All',
      allowSearchFilter: true
    };



    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);



    this.courseService.getCourse(this.id)
      .subscribe(course => {
        course.status = String(course.status);
        this.editForm.controls['id'].setValue(course.id);
        this.editForm.controls['category_id'].setValue(course.category_id);
        this.editForm.controls['name'].setValue(course.name);
        this.editForm.controls['price'].setValue(course.price);
        this.editForm.controls['duration'].setValue(course.duration);
        this.editForm.controls['duration_units'].setValue(course.duration_units);
        this.editForm.controls['long_description'].setValue(course.long_description);
        this.editForm.controls['short_description'].setValue(course.short_description);
        this.editForm.controls['image'].setValue(course.image);
        this.editForm.controls['status'].setValue(course.status);

        let co_users_selected = [];
        for (var i = 0; i < course.instructors.length; i++) {
          if (course.instructors[i].pivot.is_primary == 1) {
            this.primary_instructor_id = course.instructors[i].id;
            this.editForm.controls['primary_instructor_id'].setValue(course.instructors[i].id);
          }else{
            co_users_selected.push(course.instructors[i]);
          }
        }
        this.editForm.controls['co_instructors'].setValue(co_users_selected);

        this.getCoInstructors(this.primary_instructor_id);

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
  getInstructors(not_user): void {
    this.webinarService.getInstructors(not_user)
      .subscribe(users => this.users = users);
  }
  getCoInstructors(not_user): void {
    this.webinarService.getInstructors(not_user)
      .subscribe(co_users => this.co_users = co_users);
  }
  onSubmit() {
    this.courseService.updateCourse(this.editForm.value, this.id)
      .subscribe(course => this.course = course);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.editForm.get('image').setValue(file);
    }
  }
}
