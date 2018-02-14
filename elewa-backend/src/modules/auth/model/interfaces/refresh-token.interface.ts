import { ObjectId, Timestamp } from "bson";

/**
 * Refresh token interface.
 * 
 * A refresh token is an agreement between the server and user that this device has access to the system
 *  for the user.
 *
 * Users use refresh tokens to ask for a bearer token containing their claims (authentication)
 *  A copy of the Refresh Token send to the user is kept on the server.
 *  We verify the validity of the refresh token based on a comparison between the server secret and user secret.
 *  We also verify the validity by comparing time created with time valid. 
 */
export interface RefreshToken {
  
  _id?: String;

  // In a later strategy, we can create different refresh tokens for different origins. We therefore keep a foreign key to config since their could be multiple configs soon.
  refreshConfigId: ObjectId;
  userId: ObjectId;

  /** Agreed upon secret between token and backend database. Used to verify validity of token. */
  handshake: String; // uuid.v4 generated secret

  machineName?: String;

  issueDate: Date;

}
