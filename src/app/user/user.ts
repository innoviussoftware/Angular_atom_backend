import { Course } from '../course/course';
export class User {
  id: number;
  name: string;
  email: string;
  email_verified_at:string;
    roles:any[];
    courses:Course[];
    updated_at: string;
    created_at: string;
}
