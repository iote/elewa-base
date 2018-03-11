import { UserProfile } from 'elewa-shared/user/user-profile.interface';

export interface User extends UserProfile {
  claims: String[];
}
