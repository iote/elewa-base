import { Model }         from 'mongoose';
import { Component }     from '@nestjs/common';

import { InjectModel }   from '@nestjs/mongoose';

import { AbstractRepository } from '../../../../base/data/abstract.repository';

import { RoleSchema } from '../schemas/role.schema';
import { Role } from '../interfaces/role.interface';

@Component()
export class RoleRepository extends AbstractRepository<Role>
{  
  constructor(@InjectModel(RoleSchema) refTModel: any) {
    super(refTModel);
  }

  findByKey(slug: string) {
    return this.single({ slug });
  }
}