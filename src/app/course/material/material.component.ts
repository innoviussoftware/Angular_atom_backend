import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../material.service';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { Material } from '../material';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  id: number;
  material_upload = new FormData();
  course: Course;
  materials: Material[];
  @ViewChild('material_input') materialInput: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService,
    private courseService: CourseService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.material_upload.append('course_id', String(this.id));
  }


  ngOnInit() {
    this.courseService.getCourse(this.id)
      .subscribe(course => this.materials = course.materials);
  }

  onSubmit() {
    this.materialService.storeMaterials(this.material_upload)
      .subscribe(materials => {
        for(var i = 0; i < materials.length; i++){
          this.materials.push(materials[i]);
        }
      });
      this.material_upload.delete('file[]');
      this.materialInput.nativeElement.value = '';

    // this.courseService.getCourse(this.id)
    //     .subscribe(course => this.materials = course.materials);
        // document.getElementById('material_form').reset();
  }

  onFileChange(event) {
    this.material_upload.delete('file[]');
    if (event.target.files.length > 0) {
      let files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        this.material_upload.append("file[]", files[i]);
      }
      // this.material_upload.append('file', files);
    }
  }

  delete(material: Material): void{
    this.materials = this.materials.filter(m => m !== material);
    this.materialService.deleteMaterial(material).subscribe();
  }

}
