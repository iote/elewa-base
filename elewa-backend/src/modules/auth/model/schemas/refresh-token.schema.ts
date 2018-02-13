import { Schema } from 'mongoose';
import { ObjectId, Timestamp } from 'bson';


/**
 * Explanation @see refresh-token.interface
 */
export const RefreshTokenSchema = new Schema({
  
  // _id: String, - Added default by Mongoose

  // In a later strategy, we can create different refresh tokens for different origins. We therefore keep a foreign key to config since their could be multiple configs soon.
  refreshConfigId: ObjectId!,
  userId: ObjectId!,

  secret: String!, // uuid.v4 generated secret

  machineName: String,

  creationDate: Timestamp!

});
