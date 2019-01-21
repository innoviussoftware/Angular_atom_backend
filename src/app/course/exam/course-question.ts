import { CourseAnswer } from './course-answer';
export class CourseQuestion {
  id: number = 0;
  course_id: number = 0;
  question: string = "";
  course_answers: CourseAnswer[];
  updated_at: string = "";
  created_at: string = "";
}
