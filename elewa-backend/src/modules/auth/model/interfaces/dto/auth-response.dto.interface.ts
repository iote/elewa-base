import { UserProfile } from '../../../../user/model/interfaces/user-profile.interface';
import { ObjectId } from 'bson';

export interface AuthResponseDto {

  userId: ObjectId;

  refreshToken: string;
  bearerToken:  string;

}
