import { Dto } from '../dto.interface';

export interface AuthRequestDto extends Dto {
  login: String;
  password: String;
}