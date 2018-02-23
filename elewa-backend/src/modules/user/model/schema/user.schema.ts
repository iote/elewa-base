import { Schema } from 'mongoose';
import { UserprofileSchema } from './user-profile.schema';

/**
 * Explanation @see user.interface
 */
export const UserSchema = new Schema({

  login: String!,
  password: String!,

  profile: UserprofileSchema!,

  /** List of user roles. Roles have different claims, claims give access to backend module. */
  role: { type: String!, enum: ['eta', 'etf', 'admin']},

  createdOn: Date!
});
