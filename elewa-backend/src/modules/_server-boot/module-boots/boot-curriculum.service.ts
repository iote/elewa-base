import { Component, Inject, Logger }     from '@nestjs/common';

import { INestApplication } from '@nestjs/common/interfaces';
import { IBootService } from '../boot-service.interface';

import { CurriculumFixture } from '../../curriculum/model/fixtures/curriculum.fixture';

@Component()
export class BootCurriculumService implements IBootService {
  constructor(@Inject(CurriculumFixture) private _curriculumFixture :CurriculumFixture) 
  {}
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    Logger.log("Booting Curriculum Module", "BootCurriculumService.boot");

    await this._curriculumFixture.load();

    return true;       // && await ..
  }

}