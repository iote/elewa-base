import { Schema } from 'mongoose';
import { CourseSchema } from './course.schema';

/**
 * Universal subject instance. Used to define a single subject in the context of the educational system.
 * 
 * Has one or different courses 
 *  More in case a subject is split into semesteral modules or many years like in secondary education.
 *  (Mathematics 1, 2, 3, 4)
 */
export const SubjectSchema = new Schema({
  
  name: String,

  curriculumId: String/*{ 
    type: Schema.Types.ObjectId, 
    ref: 'Curriculum'
  }*/,
  
  color: String,
  
  icon: String,
  
  courses: [CourseSchema]
});
