import { ChapterContent } from './chapter-content';
export class Chapter {
  id: number = 0;
  course_id: number = 0;
  title: string = "";
  priority: number = 0;
  updated_at: string = "";
  created_at: string = "";
  chapter_contents: ChapterContent[];

}
