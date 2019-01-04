import { Course } from '../course/course';
export class User {
  id: number;
  name: string;
  email: string;
  last_name: string;
  email_verified_at:string;
  contact_number:string;
  short_description:string;
  biography:string;
  facebook:string;
  twitter:string;
  google:string;
  pinterest:string;
  updated_at: string;
  created_at: string;
  token: string;
  courses: Course[];
  skype:string;

}
