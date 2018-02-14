import { ObjectId } from 'bson';
import { UserProfile } from '../../../user/model/interfaces/user-profile.interface';

export interface AuthResponseDto {

  userId: ObjectId;
  user: UserProfile;
  claims: [String];
  
}