import { Schema } from 'mongoose';

/**
 * The subtopic schema handles the lowest unit of structure in courses, the SubTopic
 */
export const SubTopicSchema = new Schema({

  name: String,
  
});
