import { Schema } from 'mongoose';
import { TopicSchema } from './topic.schema';


/**
 * The course object is bound to a certain curriculum and subject and is the holder of 
 * all topics, subtopics and lessons for that subject in curriculum
 */
export const CourseSchema = new Schema({
  
  name: String, // Usually the same as subject name

  subjectId: String,
  order: Number, // e.g. Form 1 - 4

  topics: [TopicSchema]

});
