import { Schema } from 'mongoose';


/**
 * Explanation @see auth-config.interface
 */
export const AuthConfigSchema = new Schema({
  
  refreshTokenSecret: String!,
  refreshTokenExpiry: Number!,

  bearerTokenSecret: String!,
  bearerTokenExpiry: Number!

});
