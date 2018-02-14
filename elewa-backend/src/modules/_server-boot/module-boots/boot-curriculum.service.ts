import { Component, Inject }     from '@nestjs/common';

import { INestApplication } from '@nestjs/common/interfaces';
import { IBootService } from '../boot-service.interface';

import { CurriculumFixture } from '../../curriculum/model/fixtures/curriculum.fixture';

@Component()
export class BootCurriculumService implements IBootService {
  constructor(@Inject(CurriculumFixture) private _curriculumFixture :CurriculumFixture) 
  {}
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    console.log("Booting Curriculum Module");

    await this._curriculumFixture.load();

    return true;       // && await ..
  }

}