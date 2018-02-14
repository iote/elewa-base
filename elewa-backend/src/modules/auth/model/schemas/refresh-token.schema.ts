import { Schema } from 'mongoose';
import { ObjectId } from 'bson';


/**
 * Explanation @see refresh-token.interface
 */
export const RefreshTokenSchema = new Schema({
  
  // _id: String, - Added default by Mongoose

  // In a later strategy, we can create different refresh tokens for different origins. We therefore keep a foreign key to config since their could be multiple configs soon.
  refreshConfigId: ObjectId!,
  userId: ObjectId!,

  /** Agreed upon secret between token and backend database. Used to verify validity of token. */
  handshake: String!, // uuid.v4 generated secret

  machineName: String,

  issueDate: Date!

});
