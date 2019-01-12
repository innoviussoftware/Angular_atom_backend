import { Answer } from './answer';
export class Question {
  id: number = 0;
  chapter_id: number = 0;
  question: string = "";
  answers: Answer[];
  updated_at: string = "";
  created_at: string = "";
}
