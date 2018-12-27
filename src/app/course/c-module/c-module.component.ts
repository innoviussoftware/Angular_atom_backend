import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

import { CModuleService } from '../c-module.service';
import { CourseService } from '../course.service';
import { SectionService } from '../section.service';
import { Course } from '../course';
import { Section } from '../section';
import { CModule } from '../c-module';

declare var $: any;

@Component({
  selector: 'app-c-module',
  templateUrl: './c-module.component.html',
  styleUrls: ['./c-module.component.css']
})

export class CModuleComponent implements OnInit {
  id: number;
  course: Course;;
  cmodules: CModule[];
  cmodule: CModule;
  addForm: FormGroup;
  editForm: FormGroup;
  editSectionForm: FormGroup;
  module_files: String[];
  file_upload = new FormData();
  sections: FormArray;

  // @ViewChild('material_input') materialInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private cmoduleService: CModuleService,
    private courseService: CourseService,
    private sectionService: SectionService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.courseService.getCourse(this.id)
      .subscribe(course => {
        this.course = course;
        this.cmodules = course.modules;
      });

    this.addForm = this.formBuilder.group({
      course_id: [this.id, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required],
      sections: this.formBuilder.array([this.createSection()])
    });

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required]
    });

    this.editSectionForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  createSection(): FormGroup {
    return this.formBuilder.group({
      title: '',
      description: '',
    });
  }

  addSection(): void {
    this.sections = this.addForm.get('sections') as FormArray;
    this.sections.push(this.createSection());
  }

  onSubmit() {
    $("#add_module_btn").prop('disabled', true);
    $("#add_module_btn").text('Wait');

    this.cmoduleService.storeModules(this.addForm.value)
      .subscribe(cmodule => {
        if (cmodule) {
          this.cmoduleService.uploadFiles(this.file_upload, cmodule.id).subscribe();
          this.file_upload.delete('file[]');
          this.cmodules.push(cmodule);
          this.addForm.controls['title'].reset();
          this.addForm.controls['description'].reset();
          this.addForm.controls['file'].reset();
          this.addForm.controls['sections'].reset();
        }
      },
        error => { },
        () => {
          $("#add_module_btn").prop('disabled', false);
          $("#add_module_btn").text('Add new module');
        }
      );
  }

  onFileChange(event) {
    this.file_upload.delete('file[]');
    if (event.target.files.length > 0) {
      let files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        this.file_upload.append("file[]", files[i]);
      }
    }
  }

  delete(module: CModule): void {
    if (confirm('Are you sure?')) {
      this.cmoduleService.deleteModule(module.id).subscribe();
      this.cmodules = this.cmodules.filter(m => m !== module);
    }
  }
  deleteSection(module: CModule): void {
    if (confirm('Are you sure?')) {
      // this.sectionService.deleteSection(module.id).subscribe();
      // this.cmodules = this.cmodules.filter(m => m !== module);
    }
  }

  deleteFile(file) {
    if (confirm('Are you sure?')) {
      this.cmoduleService.deleteModuleFile(file.id).subscribe();
      this.module_files = this.module_files.filter(m => m !== file);
    }

  }

  openModal(cmodule: CModule): void {
    this.editForm.controls['file'].reset();
    this.cmoduleService.getModule(cmodule.id).subscribe(cmodule => {
      this.editForm.controls['id'].setValue(cmodule.id);
      this.editForm.controls['title'].setValue(cmodule.title);
      this.editForm.controls['description'].setValue(cmodule.description);
      this.module_files = cmodule.module_files;
      $('#editModuleModal').modal('show');
    });
  }

  openModalSection(section: Section): void {
    this.sectionService.getSection(section.id).subscribe(section => {
      this.editSectionForm.controls['id'].setValue(section.id);
      this.editSectionForm.controls['title'].setValue(section.title);
      this.editSectionForm.controls['description'].setValue(section.description);
      $('#editSectionModal').modal('show');
    });
  }

  onUpdateModule() {
    $("#submit_module_btn").prop('disabled', true);
    $("#submit_module_btn").text('Wait');
    this.cmoduleService.updateModule(this.editForm.value)
      .subscribe(cmodule => {
        this.cmoduleService.uploadFiles(this.file_upload, this.editForm.get('id').value).subscribe();
        this.file_upload.delete('file[]');
        this.cmodules.map((cm, i) => {
          if (cm.id == cmodule.id) {
            this.cmodules[i] = cmodule;
          }
        });
      },
        error => { },
        () => {
          $("#submit_module_btn").prop('disabled', false);
          $("#submit_module_btn").text('Save changes');
        }
      );
    $('#editModuleModal').modal('hide');
  }

  updateSection() {
    $('#submit_section_btn').prop('disabled', true);
    $('#submit_section_btn').text('Wait');
    this.sectionService.updateSection(this.editSectionForm.value)
      .subscribe(
        section => {
          this.course.modules.map((cm, i) => {
            if (cm.id == section.module_id) {
              this.course.modules[i].sections.map((s, j) => {
                if (s.id == section.id) {
                  this.course.modules[i].sections[j] = section;
                }
              });
            }
          });
        }
      );
    $('#editSectionModal').modal('hide');
  }


}
