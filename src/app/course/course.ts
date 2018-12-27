import { Material } from './material';
import { Category } from '../category/category';
import { CModule } from './c-module';
import { Chapter } from './chapter';
import { User } from '../user/user';

export class Course {
  id: number;
  name: string;
  price: string;
  long_description:string;
  category_id:number;
  duration:number;
  language:string;
  image: string;
  status: string;
  user: User[];
  category: Category[];
  materials: Material[];
  modules: CModule[];
  chapters: Chapter[];
  updated_at: string;
  created_at: string;
}
