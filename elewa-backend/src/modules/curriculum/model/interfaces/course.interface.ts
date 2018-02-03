import { Topic } from './topic.interface';

export interface Course {
  
  _id?: String;

  name: String;
  order: Number; // e.g. Form 1 - 4

  topics: Topic[];

  legacyId: Number;
}
