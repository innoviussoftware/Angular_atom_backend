import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CourseService } from '../course.service'
import { CategoryService } from '../../category/category.service';
import { Course } from '../course'
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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private categoryService: CategoryService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      user_id: ['', Validators.required],
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


    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.courseService.getCourse(this.id)
      .subscribe(course => {
        delete course.user;
        delete course.category;
        delete course.materials;
        delete course.modules;
        delete course.updated_at;
        delete course.created_at;
        course.status = String(course.status);
        this.editForm.setValue(course);
      });

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
