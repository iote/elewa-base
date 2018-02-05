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
     // Break off insert sequence if one fails.
    for(let subject of subjects) 
      await this.createSubject(subject);
  
    return true;
  }

  async createSubject(subject: Subject): Promise<any> {
    return this._repo.insert(subject);
  }

  async find(query: any): Promise<Subject[]> {
    return this._repo.find(query);
  }

  async findSingle(query: any): Promise<Subject> {
    return this._repo.single(query);
  }

  async findAll(): Promise<Subject[]> {
    return this._repo.findAll();
  }

    
  async subjectsExist(): Promise<boolean> {
    return (await this.findAll()).length > 0;
  }
}