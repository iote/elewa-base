import { UserProfile } from '../../../user/model/interfaces/user-profile.interface';

/**
 * Payload of a Bearer Token
 */
interface BearerToken {

  userId: String;
  user: UserProfile;

  /** Claims are configured per role. A role gives access to certain claims. 
   * 
   *  A claim is an access token to a specific module or endpoint on the backend. */
  claims: String[];

}