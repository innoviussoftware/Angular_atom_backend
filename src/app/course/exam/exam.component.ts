import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CourseQuestionService } from './course-question.service';
import { CourseAnswerService } from './course-answer.service';
import { CourseQuestion } from './course-question';
import { CourseAnswer } from './course-answer';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {

  id: number;
  course_questions: CourseQuestion[];
  selected_course_question: CourseQuestion;
  selected_course_answer: CourseAnswer;

  constructor(
    private route: ActivatedRoute,
    private courseQuestionService: CourseQuestionService,
    private courseAnswerService: CourseAnswerService,
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.courseQuestionService.getCourseQuestions(this.id)
      .subscribe(course_questions => {
        this.course_questions = course_questions.questions;
        console.log(course_questions);
      });
  }


  updateQuestion(event: any, course_question: CourseQuestion): void {
    course_question.question = event.target.value;
    this.selected_course_question = course_question;
    this.courseQuestionService.store(course_question)
      .subscribe(course_question => this.selected_course_question.id = course_question.id);

  }

  onBlurAnswer(event: any, course_answer: CourseAnswer): void {
    course_answer.answer = event.target.value;
    this.storeAnswer(course_answer);
  }

  onChangeAnswer(event: any, course_answer: CourseAnswer): void {
    course_answer.is_correct = event.currentTarget.checked;
    this.storeAnswer(course_answer);
  }

  storeAnswer(course_answer: CourseAnswer) {
    this.selected_course_answer = course_answer;
    this.courseAnswerService.store(course_answer).subscribe(course_answer => this.selected_course_answer.id = course_answer.id);
  }

  addQuestion() {
    let new_question = new CourseQuestion();
    new_question.course_id = this.id;
    new_question.course_answers = [];
    this.course_questions.push(new_question);
  }

  addAnswer(course_question: CourseQuestion) {
    let new_ans = new CourseAnswer();
    new_ans.course_question_id = course_question.id;
    this.selected_course_question = course_question;
    this.selected_course_question.course_answers.push(new_ans);
  }

  deleteQuestion(course_question: CourseQuestion): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.courseQuestionService.delete(course_question.id).subscribe();
      this.course_questions = this.course_questions.filter(q => q !== course_question);
    }
  }

  deleteAnswer(course_answer: CourseAnswer, course_question:CourseQuestion): void {
    if (confirm('Are you sure you want to delete this answer?')) {
      this.selected_course_question = course_question;
      this.courseAnswerService.delete(course_answer.id).subscribe();
      this.selected_course_question.course_answers = this.selected_course_question.course_answers.filter(a => a !== course_answer);
    }
  }
}
