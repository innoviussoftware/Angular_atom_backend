import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { Category } from '../category';
import { CategoryService } from '../category.service';
declare var $: any;


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  addForm: FormGroup;
  category: Category;
  isDisabled = false;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    $('#submit_btn').prop('disabled', true);
    this.categoryService.storeCategory(this.addForm.value)
    .subscribe(category => this.category = category, error => {}, () => $('#submit_btn').prop('disabled', false));


    // this.apiService.updateUser(this.editForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.status === 200) {
    //         alert('User updated successfully.');
    //         this.router.navigate(['list-user']);
    //       } else {
    //         alert(data.message);
    //       }
    //     },
    //     error => {
    //       alert(error);
    //     });
  }

}
