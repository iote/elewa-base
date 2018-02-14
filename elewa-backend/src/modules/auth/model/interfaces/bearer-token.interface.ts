import { UserProfile } from '../../../user/model/interfaces/user-profile.interface';
import { ObjectId } from 'bson';

/**
 * Payload of a Bearer Token
 */
export interface BearerToken {

  userId: ObjectId;
  user: UserProfile;

  /** Claims are configured per role. A role gives access to certain claims. 
   * 
   *  A claim is an access token to a specific module or endpoint on the backend. */
  claims: String[];

  issueDate: Date;
  
}