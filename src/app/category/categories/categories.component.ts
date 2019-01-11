import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../category.service';
import { Category } from '../category';
declare var $: any;


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  delete(category: Category): void {
    if (confirm('Related courses of this category will be deleted if you will delete this category. Are you sure you want to delete this Category?')) {
      this.categories = this.categories.filter(c => c !== category);
      this.categoryService.deleteCategory(category).subscribe();
    }
  }

}
