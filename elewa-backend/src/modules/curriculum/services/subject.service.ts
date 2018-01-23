import { Model }         from 'mongoose';
import { Component, Inject }     from '@nestjs/common';
import { InjectModel }   from '@nestjs/mongoose';
import { Subject } from '../model/interfaces/subject.interface';
import { SubjectSchema } from '../model/schemas/subject.schema';
import { SubjectRepository } from '../model/repositories/subject.repository';

@Component()
export class SubjectService {
  constructor(@Inject(SubjectRepository) private readonly _repo: SubjectRepository) {}

  /*async create(createCatDto: CreateSubjectDto): Promise<Subject> {
    const createdSubject = new this.subjectModel(createCatDto);
    return await createdSubject.save();
  }*/

  async createSubjects(subjects: Subject[]) {
    var result = true;
    for(let subject of subjects) 
      // Break off insert sequence if one fails.
      result = result && await this.createSubject(subject);
  
    return result;
  }

  async createSubject(subject: Subject): Promise<boolean> {
    return this._repo.insert(subject);
  }

  async findAll(): Promise<Subject[]> {
    return this._repo.findAll();
  }
}