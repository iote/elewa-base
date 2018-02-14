import { Schema } from 'mongoose';
import { ObjectId } from 'bson';

/**
 * Explanation @see user.interface
 */
export const UserprofileSchema = new Schema({

  firstName: String,
  lastName: String,

  email: String,
  telephone: String,

  studentNo: String,

  schoolId: ObjectId

});
