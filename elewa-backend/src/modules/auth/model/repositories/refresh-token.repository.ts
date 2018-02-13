import { Model }         from 'mongoose';
import { Component }     from '@nestjs/common';

import { InjectModel }   from '@nestjs/mongoose';

import { AbstractRepository } from '../../../../base/data/abstract.repository';
import { RefreshToken } from '../interfaces/refresh-token.interface';
import { RefreshTokenSchema } from '../schemas/refresh-token.schema';

@Component()
export class RefreshTokenRepository extends AbstractRepository<RefreshToken>
{
  constructor(@InjectModel(RefreshTokenSchema) refTModel: any) {
    super(refTModel);
  }
}