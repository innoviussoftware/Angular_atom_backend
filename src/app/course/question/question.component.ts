import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Question } from './question';
import { Answer } from './answer';
import { Chapter } from '../chapter';
import { ChapterService } from '../chapter.service';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  chapter_id: number;
  questions: Question[];
  selected_question: Question;
  selected_answer: Answer;
  chapter: Chapter;

  constructor(
    private chapterService: ChapterService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute,
  ) {
    this.chapter_id = +this.route.snapshot.paramMap.get('chapter_id');
  }

  ngOnInit() {
    this.chapterService.getChapter(this.chapter_id)
      .subscribe(chapter => {
        this.chapter = chapter;
        this.questions = chapter.questions;
      });
  }

  updateQuestion(event: any, question: Question): void {
    question.question = event.target.value;
    this.questionService.store(question).subscribe();

  }

  onBlurAnswer(event: any, answer: Answer): void {
    answer.answer = event.target.value;
    this.storeAnswer(answer);
  }

  onChangeAnswer(event: any, answer: Answer): void {
    answer.is_correct = event.currentTarget.checked;
    this.storeAnswer(answer);
  }

  storeAnswer(answer:Answer){
    this.selected_answer = answer;
    this.answerService.store(answer).subscribe(answer => this.selected_answer.id = answer.id);
  }

  addQuestion(){
    let new_question = new Question();
    new_question.chapter_id = this.chapter_id;
    new_question.answers = [];
    this.questions.push(new_question);
  }

  addAnswer(question:Question){
    let new_ans = new Answer();
    new_ans.question_id = question.id;
    this.selected_question = question;
    this.selected_question.answers.push(new_ans);
  }

  deleteQuestion(question: Question): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.delete(question.id).subscribe();
      this.questions = this.questions.filter(q => q !== question);
    }
  }

  deleteAnswer(answer: Answer, question:Question): void {
    if (confirm('Are you sure you want to delete this answer?')) {
      this.selected_question = question;
      this.answerService.delete(answer.id).subscribe();
      this.selected_question.answers = this.selected_question.answers.filter(a => a !== answer);
    }
  }

}
