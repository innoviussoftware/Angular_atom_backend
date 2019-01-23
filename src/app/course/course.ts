import { Category } from '../category/category';
import { Chapter } from './chapter';
import { User } from '../user/user';

export class Course {
  id: number;
  name: string;
  price: string;
  long_description: string;
  short_description: string;
  category_id: number;
  duration: number;
  duration_units: string;
  language: string;
  image: string;
  status: string;
  is_enrolled: string;
  instructors: User[];
  users: User[];
  category: Category[];
  chapters: Chapter[];
  updated_at: string;
  created_at: string;
  course_data: any;
  sequence_type: string;
  all_chapters: string;
  test_passed: string;
  passing_score: string;
  is_reappear: string;
  is_featured: number;
  exam_duration:number;
}
