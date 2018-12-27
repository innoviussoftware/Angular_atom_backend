import { Section } from './section';

export class CModule {
  id: number;
  course_id: string;
  title: string;
  description: string;
  module_files: string[];
  sections:Section[];
  updated_at: string;
  created_at: string;
}
