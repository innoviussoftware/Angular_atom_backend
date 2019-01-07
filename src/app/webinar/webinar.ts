import { User } from '../user/user';

export class Webinar {
  id: number;
  title: string;
  instructors: User[];
  url: string;
  date_time: string;
  short_description: string;
  long_description: string;
  created_at: string;
  updated_at: string;
}
