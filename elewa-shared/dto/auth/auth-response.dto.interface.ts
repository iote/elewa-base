import { ObjectId } from 'bson';
import { Dto } from '../dto.interface';

export interface AuthResponseDto extends Dto {

  userId: ObjectId;

  refreshToken: string;
  bearerToken:  string;

}
