import { Model }         from 'mongoose';
import { Component }     from '@nestjs/common';

import { InjectModel }   from '@nestjs/mongoose';

import { AbstractRepository } from '../../../../base/data/abstract.repository';

import { UserSchema } from '../schema/user.schema';
import { User } from '../interfaces/user.interface';

@Component()
export class UserRepository extends AbstractRepository<User>
{  
  constructor(@InjectModel(UserSchema) refTModel: any) {
    super(refTModel);
  }
}