import { ObjectId } from 'bson';
import { UserProfile } from '../../../user/model/interfaces/user-profile.interface';

export interface User {
  _id?: ObjectId,

  /** Login with email, telephone, student No., ... */
  login: String,
  /** User password (hashed on client side!) */
  password: String;

  profile: UserProfile,

  /** User role. Roles have different claims, claims give access to backend module. */
  role: String;
}