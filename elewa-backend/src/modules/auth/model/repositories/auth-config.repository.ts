import { Model }         from 'mongoose';
import { Component }     from '@nestjs/common';

import { InjectModel }   from '@nestjs/mongoose';
import { AuthConfig }       from '../interfaces/auth-config.interface';
import { AuthConfigSchema } from '../schemas/auth-config.schema';

import { AbstractRepository } from '../../../../base/data/abstract.repository';

@Component()
export class AuthConfigRepository extends AbstractRepository<AuthConfig>
{
  constructor(@InjectModel(AuthConfigSchema) authConfigModel: any) {
    super(authConfigModel);
  }
}