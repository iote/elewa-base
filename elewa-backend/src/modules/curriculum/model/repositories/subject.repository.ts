import { Model }         from 'mongoose';
import { Component }     from '@nestjs/common';

import { InjectModel }   from '@nestjs/mongoose';
import { Subject }       from '../interfaces/subject.interface';
import { SubjectSchema } from '../schemas/subject.schema';

import { AbstractRepository } from '../../../../base/data/abstract.repository';

@Component()
export class SubjectRepository extends AbstractRepository<Subject>
{
  constructor(@InjectModel(SubjectSchema) subjectModel: any) {
    super(subjectModel);
  }
}