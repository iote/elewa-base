import { Component, Inject }     from '@nestjs/common';
import { IBootService } from '../boot-service.interface';
import { INestApplication } from '@nestjs/common/interfaces';

import * as cors from 'cors';

@Component()
export class ConfigureCorsService implements IBootService {
  constructor() {}
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    console.log("Booting Server - Configuring CORS");

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

    return true;
  }

}