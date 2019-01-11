import { User } from '../user/user';
import { Course } from '../course/course';

export class Webinar {
  id: number;
  title: string;
  instructors: User;
  url: string;
  date_time: string;
  duration: number;
  short_description: string;
  long_description: string;
  user_id: number;
  course_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  co_instructors: User[];
  image: string;
  get_enrolled_users: User[];
  course: Course;
  user: User;
}
