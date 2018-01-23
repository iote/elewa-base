import { Topic } from './topic.interface';

export interface Course {
  
  name: String;

  subjectId: String;
  order: Number; // e.g. Form 1 - 4

  topics: Topic[];
}
