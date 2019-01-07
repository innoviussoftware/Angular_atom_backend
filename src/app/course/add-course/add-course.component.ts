import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CourseService } from '../course.service'
import { CategoryService } from '../../category/category.service';
import { Course } from '../course';

declare var $: any;

@Component({
  selector: 'app-course',
  templateUrl: './add-course.component.html',
  // styleUrls: ['./course.component.css']
})
export class AddCourseComponent implements OnInit {
  course: Course;
  categories: any[];
  addForm: FormGroup;
  auth_user = JSON.parse(localStorage.getItem("auth_user"));


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);

    this.addForm = this.formBuilder.group({
      category_id: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      duration_units: ['', Validators.required],
      name: ['', Validators.required],
      long_description: ['', Validators.required],
      short_description: ['', Validators.required],
      image: [null, Validators.required],
      status: ['0', Validators.required],
    });
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.courseService.storeCourse(formModel)
      .subscribe(course => {
        this.router.navigate(['/courses/edit/'+course.id+'/details']);
        // window.scrollTo(0, 0);
      });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.addForm.get('image').setValue(file);
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.addForm.controls`, but we'll keep it as simple as possible here
    input.append('user_id', this.auth_user.id);
    input.append('name', this.addForm.get('name').value);
    input.append('category_id', this.addForm.get('category_id').value);
    input.append('price', this.addForm.get('price').value);
    input.append('duration', this.addForm.get('duration').value);
    input.append('duration_units', this.addForm.get('duration_units').value);
    input.append('long_description', this.addForm.get('long_description').value);
    input.append('short_description', this.addForm.get('short_description').value);
    input.append('status', this.addForm.get('status').value);
    input.append('image', this.addForm.get('image').value);
    return input;
  }
}
