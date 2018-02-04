import { Component, Inject }     from '@nestjs/common';
import { CurriculumFixture } from '../../curriculum/model/fixtures/curriculum.fixture';
import { INestApplication } from '@nestjs/common/interfaces';

import * as cors from 'cors';

@Component()
export class BootService {
  constructor(@Inject(CurriculumFixture) private _curriculumFixture :CurriculumFixture) {}
  
  async boot(app: INestApplication): Promise<boolean> {
    this._configureApp(app);

    await this._curriculumFixture.load();

    return true;       // && await ..
  }

  _configureApp(app:INestApplication) :void {
    this._configureCORS(app);
  }

  _configureCORS(app:INestApplication) :void {
    const corsOptions = {
      origin(origin, callback) {
          callback(null, true);
      },
      credentials: true
    };
    app.use(cors(corsOptions));
    var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,token');
      next();
    }
    app.use(allowCrossDomain);
    }
}