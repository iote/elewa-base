import { Schema } from 'mongoose';

/**
 * Explanation @see role.interface
 */
export const RoleSchema = new Schema({
  
  /** Foreign key to role. Must never change after insert. */
  slug: String!,

  /** Display name of role for admin purposes. */
  name: String!,

  claims:[String]
 
});
