import { Course } from './course.interface';

export interface Subject {

  name: String;

  curriculumId: String;
  
  color: String;
  
  icon: String;
  
  courses: Course[];

}
