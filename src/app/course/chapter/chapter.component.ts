import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Chapter } from "../chapter";
import { ChapterContent } from "../chapter-content";
import { CourseService } from "../course.service";
import { ChapterService } from "../chapter.service";
declare var $: any;

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})

export class ChapterComponent implements OnInit {

  id: number;
  chapters: Chapter[];
  chapter: Chapter;
  // chapter_content: ChapterContent;
  addChapterContentForm: FormGroup;
  contentVideoForm: FormGroup;
  contentImageForm: FormGroup;
  editChapterContentForm: FormGroup;
  image_upload = new FormData();
  @ViewChild("fileInput") fileInput;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private chapterService: ChapterService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.courseService.getCourse(this.id)
      .subscribe(course => this.chapters = course.chapters);

    this.addChapterContentForm = this.formBuilder.group({
      title: ['', Validators.required],
      chapter_id: ['', Validators.required],
      type: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['', Validators.required],
    });

    this.editChapterContentForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['', Validators.required],
    });

    this.contentVideoForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      chapter_id: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['', Validators.required],
    });

    this.contentImageForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      chapter_id: ['', Validators.required],
      content: ['', Validators.required],
      priority: ['', Validators.required],
    });

  }

  updateTitle(event: any, chapter: Chapter): void {
    chapter.title = event.target.value;
    this.updateChapter(chapter);
  }

  onClickAddChapter(): void {
    this.createChapter();
  }

  onClickdelete(chapter: Chapter): void {
    if (confirm('Are you sure you want to delete this chapter?')) {
      this.chapterService.delete(chapter.id).subscribe();
      this.chapters = this.chapters.filter(c => c !== chapter);
    }
  }

  updateChapter(chapter: Chapter): void {
    this.chapterService.update(chapter, chapter.id).subscribe();
  }

  createChapter(): void {
    $("#add_chapter_btn").prop('disabled', true);
    $("#add_chapter_btn").text('Wait');
    let chapter = new Chapter();
    chapter.title = "New chapter";
    chapter.course_id = this.id;
    this.chapterService.store(chapter).subscribe(
      chapter => {
        this.chapters.push(chapter);
        $("#add_chapter_btn").prop('disabled', false);
        $("#add_chapter_btn").text('Add chapter +');
      }
    );
  }

  openChapterContentModal(chpater_id: number): void {
    this.addChapterContentForm.controls['chapter_id'].setValue(chpater_id);
    this.addChapterContentForm.controls['title'].setValue('');
    this.addChapterContentForm.controls['type'].setValue('html');
    this.addChapterContentForm.controls['priority'].setValue(0);
    this.addChapterContentForm.controls['content'].reset();
    $('#addChapterContentModal').modal('show');
  }

  openVideoModal(chapter_id: number, content: ChapterContent) {
    this.contentVideoForm.controls['id'].setValue(content ? content.id : 0);
    this.contentVideoForm.controls['title'].setValue(content ? content.title : '');
    this.contentVideoForm.controls['chapter_id'].setValue(chapter_id);
    this.contentVideoForm.controls['type'].setValue('video');
    this.contentVideoForm.controls['priority'].setValue(content ? content.priority : 0);
    this.contentVideoForm.controls['content'].setValue(content ? content.content : "");
    $('#video_modal').modal('show');
  }

  openImageModal(chapter_id: number, content: ChapterContent) {
    this.contentImageForm.controls['id'].setValue(content ? content.id : 0);
    this.contentImageForm.controls['title'].setValue(content ? content.title : '');
    this.contentImageForm.controls['chapter_id'].setValue(chapter_id);
    this.contentImageForm.controls['type'].setValue('image');
    this.contentImageForm.controls['priority'].setValue(content ? content.priority : 0);
    this.contentImageForm.controls['content'].setValue(content ? content.content : '');
    this.image_upload.delete('image');
    this.fileInput.nativeElement.value = "";
    $('#image_modal').modal('show');
  }

  submitVideoContent() {
    $("#submit_video_button").prop('disabled', true);
    $("#submit_video_button").text('Wait');
    if (this.contentVideoForm.value.id !== 0) {
      this.chapterService.updateContent(this.contentVideoForm.value, this.contentVideoForm.value.id)
        .subscribe(chapter_content => {
          this.chapters.map((ch, i) => {
            if (ch.id == chapter_content.chapter_id) {
              ch.chapter_contents.map((cc, j) => {
                if (cc.id == chapter_content.id) {
                  ch.chapter_contents[j] = chapter_content;
                }
              });
              $('#video_modal').modal('hide');
              $("#submit_video_button").prop('disabled', false);
              $("#submit_video_button").text('Submit');
            }
          });
        });
    } else {
      this.chapterService.storeContent(this.contentVideoForm.value)
        .subscribe(chapter_content => {
          this.chapters.map((ch, i) => {
            if (ch.id == chapter_content.chapter_id) {
              ch.chapter_contents.push(chapter_content);
              $('#video_modal').modal('hide');
              $("#submit_video_button").prop('disabled', false);
              $("#submit_video_button").text('Submit');
            }
          });
        });
    }
  }

  submitImageContent() {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      $("#submit_image_button").prop('disabled', true);
      $("#submit_image_button").text('Wait');
        let fileToUpload = fi.files[0];
        let input = new FormData();
        input.append("image", fileToUpload);
        this.chapterService.file_upload(input)
        .subscribe(file_upload => {

          this.contentImageForm.controls['content'].setValue(file_upload.path);
          this.chapterService.storeContent(this.contentImageForm.value)
            .subscribe(chapter_content => {
              this.chapters.map((ch, i) => {
                if (ch.id == chapter_content.chapter_id) {
                  ch.chapter_contents.push(chapter_content);
                }
              });
              $('#image_modal').modal('hide');
            })
            .add(() => {
              $("#submit_image_button").prop('disabled', false);
              $("#submit_image_button").text('Submit');
            });
        });
    }else{
      alert("Please select an image to upload.");
    }
  }

  openEditChapterContentModal(content: ChapterContent): void {
    this.editChapterContentForm.controls['id'].setValue(content.id);
    this.editChapterContentForm.controls['title'].setValue(content.title);
    this.editChapterContentForm.controls['type'].setValue('html');
    this.editChapterContentForm.controls['priority'].setValue(0);
    this.editChapterContentForm.controls['content'].setValue(content.content);
    $('#editChapterContentModal').modal('show');
  }

  onSubmitAddContentForm() {
    $("#add_chapter_content_btn").prop('disabled', true);
    $("#add_chapter_content_btn").text('Wait');
    this.chapterService.storeContent(this.addChapterContentForm.value)
      .subscribe(chapter_content => {
        this.chapters.map((ch, i) => {
          if (ch.id == chapter_content.chapter_id) {
            ch.chapter_contents.push(chapter_content);
          }
        });
        $('#addChapterContentModal').modal('hide');
      })
      .add(() => {
        // Do some work after complete...
        $("#add_chapter_content_btn").prop('disabled', false);
        $("#add_chapter_content_btn").text('Submit');
    });
  }

  onSubmitEditContentForm() {
    $("#edit_chapter_content_btn").prop('disabled', true);
    $("#edit_chapter_content_btn").text('Wait');
    this.chapterService.updateContent(this.editChapterContentForm.value, this.editChapterContentForm.value.id)
      .subscribe(chapter_content => {
        this.chapters.map((ch, i) => {
          if (ch.id == chapter_content.chapter_id) {
            ch.chapter_contents.map((cc, j) => {
              if (cc.id == chapter_content.id) {
                ch.chapter_contents[j] = chapter_content;
              }
            });
            $('#editChapterContentModal').modal('hide');
          }
        });
      })
      .add(()=>{
        $("#edit_chapter_content_btn").prop('disabled', false);
        $("#edit_chapter_content_btn").text('Submit');
      });
  }

  deleteChapterContent(content: ChapterContent, index: number): void {
    if (confirm('Are you sure you want to delete this content?')) {
      this.chapters[index].chapter_contents = this.chapters[index].chapter_contents.filter(c => c !== content);
      this.chapterService.deleteContent(content.id).subscribe();
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
