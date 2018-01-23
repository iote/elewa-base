import { Model }         from 'mongoose';
import { Component }     from '@nestjs/common';
import { InjectModel }   from '@nestjs/mongoose';
import { Subject }       from '../model/interfaces/subject.interface';
import { SubjectSchema } from '../model/schemas/subject.schema';

@Component()
export class SubjectService {
  constructor(@InjectModel(SubjectSchema) private readonly subjectModel: Model<Subject>) {}

  /*async create(createCatDto: CreateSubjectDto): Promise<Subject> {
    const createdSubject = new this.subjectModel(createCatDto);
    return await createdSubject.save();
  }*/

  async findAll(): Promise<Subject[]> {
    return await this.subjectModel.find().exec();
  }
}