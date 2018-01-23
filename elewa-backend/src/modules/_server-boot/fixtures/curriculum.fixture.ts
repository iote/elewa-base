import { Component } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { SubjectSchema } from '../../curriculum/model/schemas/subject.schema';
import { Subject } from '../../curriculum/model/interfaces/subject.interface';
import { Model } from 'mongoose';

@Component()
export class CurriculumFixture {

  constructor(@InjectModel(SubjectSchema) private readonly _subjectModel: Model<Subject>) {}

  async load(): Promise<boolean> {
    // const subjects = await this.subjectModel.find().exec();
    // if(subjects.length === 0)
    //    this._preloadFixtures();
    
    return true;
  }

  async insert(subject: Subject): Promise<boolean> {
    const toInsert = new this._subjectModel(subject);    

    await toInsert.save();
    return true;
  }
}