import { User } from '../user/user';

export class Webinar {
  id: number;
  title: string;
  instructors: User;
  url: string;
  date_time: string;
  short_description: string;
  long_description: string;
  user_id: number;
  course_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  co_instructors: User[];
}