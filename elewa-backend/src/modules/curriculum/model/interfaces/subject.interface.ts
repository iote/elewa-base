import { Course } from './course.interface';

export interface Subject {

  _id?: String;

  name: String;

  curriculumId: String;
  
  slug: String;
  
  icon: String;
  
  courses: Course[];

  legacyId: Number;

}
