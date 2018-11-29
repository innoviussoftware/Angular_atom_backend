import { Material } from './material';
import { Category } from '../category/category';
export class Course {
  id: number;
  name: string;
  price: string;
  long_description:string;
  category_id:number;
  duration:number;
  language:string;
  image: string;
  user: any[];
  category: Category[];
  materials: Material[];
  updated_at: string;
  created_at: string;
}
