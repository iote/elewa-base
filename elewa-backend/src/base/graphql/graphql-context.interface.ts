import { BearerToken } from './../../../../elewa-shared/token/bearer-token.interface';
import { Dto } from "elewa-shared/dto/dto.interface";


export interface GraphqlContext extends Dto {
  bearer: BearerToken;
  request: any;
}
