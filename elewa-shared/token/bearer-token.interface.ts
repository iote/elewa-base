import { UserProfile } from '../user/user-profile.interface';
import { ObjectId } from 'bson';

/**
 * Payload of a Bearer Token
 */
export interface BearerToken {

  userId: ObjectId;
  user: UserProfile;

  role: "user" | "admin";
  /** Claims are configured per role. A role gives access to certain claims. 
   * 
   *  A claim is an access token to a specific module or endpoint on the backend. */
  claims: String[];

  issueDate: Date;
  
}