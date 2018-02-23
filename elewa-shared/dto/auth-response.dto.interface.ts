import { ObjectId } from 'bson';

export interface AuthResponseDto {

  userId: ObjectId;

  refreshToken: string;
  bearerToken:  string;

}
