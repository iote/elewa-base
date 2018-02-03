import { Component, Inject }     from '@nestjs/common';
import { CurriculumFixture } from '../../curriculum/model/fixtures/curriculum.fixture';

@Component()
export class BootService {
  constructor(@Inject(CurriculumFixture) private _curriculumFixture :CurriculumFixture) {}
  
  async boot(): Promise<boolean> {
    return await this._curriculumFixture.load();
           // && await ..
  }
}