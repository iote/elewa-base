import { Schema } from 'mongoose';
import { SubTopicSchema } from './sub-topic.schema';

/**
 * The topic schema handles a certain topic within a course
 */
export const TopicSchema = new Schema({
  
  name: String,

  subTopics: [SubTopicSchema],
  
});
