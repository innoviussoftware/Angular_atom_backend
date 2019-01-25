import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CourseService } from "../course.service";
import { Course } from '../course';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  id: number;
  course: Course;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private courseService: CourseService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');
    $('#passing_score').hide();
    this.editForm = this.formBuilder.group({
      id: [this.id, Validators.required],
      sequence_type: ['1', Validators.required],
      all_chapters: ['1', Validators.required],
      test_passed: ['1', Validators.required],
      passing_score: ['0', Validators.required],
      is_reappear: ['1', Validators.required],
      exam_duration: ['', Validators.required]
    });

    this.courseService.getCourse(this.id)
      .subscribe(course => {
        course.sequence_type = String(course.sequence_type);
        course.all_chapters = String(course.all_chapters);
        course.test_passed = String(course.test_passed);
        course.passing_score = String(course.passing_score);
        course.is_reappear = String(course.is_reappear);
        course.exam_duration = course.exam_duration;

        this.editForm.controls['id'].setValue(course.id);
        this.editForm.controls['sequence_type'].setValue(course.sequence_type);
        this.editForm.controls['all_chapters'].setValue(course.all_chapters);
        this.editForm.controls['test_passed'].setValue(course.test_passed);
        this.editForm.controls['passing_score'].setValue(0);
        this.editForm.controls['is_reappear'].setValue(course.is_reappear);
        this.editForm.controls['exam_duration'].setValue(course.exam_duration);
        if (course.test_passed == '1') {
          this.editForm.controls['passing_score'].setValue(course.passing_score);
          $('#passing_score').show();
        }
      });
  }

  onSubmit() {
    this.courseService.updateSettings(this.editForm.value, this.id)
      .subscribe(course => this.course = course);
  }

  test_passed(event) {
    let test_passed = event.target.value;
    if (test_passed == 1) {
      $('#passing_score').show();
    } else {
      $('#passing_score').hide();
      // this.editForm.controls['passing_score'].setValue(0);
    }

  }

}
