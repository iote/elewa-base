import { Component, Inject } from '@nestjs/common';
import * as _ from 'underscore';

import { SubjectService } from '../../services/subject.service';

import { Subject } from '../interfaces/subject.interface';
import { Course } from '../interfaces/course.interface';
import { Topic } from '../interfaces/topic.interface';
import { SubTopic } from '../interfaces/sub-topic.interface';

declare var require: any;
const subjects = [].concat(require('./data/biology.courseInformation.json'),
                           require('./data/chemistry.courseInformation.json'),
                           require('./data/computerstudies.courseInformation.json'),
                           require('./data/geography.courseInformation.json'),
                           require('./data/history.courseInformation.json'),
                           require('./data/mathematics.courseInformation.json'),
                           require('./data/physics.courseInformation.json'));

const subjectSlugs = ['biology', 'chemistry', 'compsci', 'geography', 'history', 'mathematics', 'physics'];
const subjectIcons =  ['fas fa-tree', 'fas fa-flask', 'fas fa-laptop', 'fas fa-map-signs', 'fab la-leanpub', 'fas fa-magnet', 'fas fa-superscript'];

@Component()
export class CurriculumFixture {

  constructor(@Inject(SubjectService) private readonly _subjectService: SubjectService) {}

  async load(): Promise<boolean> {
    console.log("Loading curriculum fixture");

    if(! await this._subjectService.subjectsExist()) {
      console.log("No subjects yet. Creating subjects from fixture.");

      for(var i = 0; i < subjects.length; i++)
        await this._createSubject(subjects[i], subjectSlugs[i], subjectIcons[i]);
    }
    return true;
  }

  private _createSubject(subj: any, slug: string, icon:string) {
    this._subjectService.createSubject(this._convertToSubject(subj, slug, icon));
  }

  private _convertToSubject(encodedSubject: any, slug: string, icon: string) : Subject {
    
    return {
      name: encodedSubject.name,
      curriculumId: encodedSubject.subjectId,
      slug: slug,
      legacyId: encodedSubject.lId,
      icon: icon,

      courses: _.map(encodedSubject.classes, this._convertToCourse, this)
    };
  }

  private _convertToCourse(encodedClass: any): Course {
    return {
      name: encodedClass.name,
      order: encodedClass.order,
      
      legacyId: encodedClass.lId,

      topics: _.map(encodedClass.topics, this._convertToTopic, this)
    };
  }

  private _convertToTopic(encodedTopic: any): Topic {
    return {
      name: encodedTopic.name,
      legacyId: encodedTopic.lId,

      subTopics: _.map(encodedTopic.subTopics, this._convertToSubTopic, this)
    };
  }

  private _convertToSubTopic(encodedSubTopic: any): SubTopic {
    return {
      name: encodedSubTopic.name,
      legacyId: encodedSubTopic.lId
    };
  }
}
/*

{
  "_id": "01a3daf6-da1a-4e97-a1a1-f24432e129bb",
  "name": "Biology",
  "subjectId": "RxMN8G4RBouSkmzqM",
  "lId": 20,
  "classes": [
    {
      "_id": "a7f95527-e326-4e7e-a615-9250e6f017ca",
      "name": "Form 1",
      "order": 1,
      "courseId": "RxMN8G4RBouSkmzqM",
      "lId": 0,
      "topics": [
        {
          "_id": "0c11f36c-61b6-4bc8-9e54-77068aa394ad",
          "name": "Introduction to Biology",
          "courseClassId": "a7f95527-e326-4e7e-a615-9250e6f017ca",
          "lId": 382,
          "subTopics": [
            {
              "_id": "2000104d-6405-46a2-8681-fc9ad3265353",
              "name": "Definition of Biology",
              "topicId": "0c11f36c-61b6-4bc8-9e54-77068aa394ad",
              "lId": 2797
            },

            */

          