import { Schema } from 'mongoose';
import { ObjectID } from 'bson';

/**
 * Explanation @see user.interface
 */
export const UserprofileSchema = new Schema({

  firstName: String,
  lastName: String,

  email: String,
  telephone: String,

  idNo: String,
  empNo: String

});
