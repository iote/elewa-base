import { Component, Inject, Logger }     from '@nestjs/common';
import { IBootService } from '../boot-service.interface';
import { INestApplication } from '@nestjs/common/interfaces';

import * as cors from 'cors';

@Component()
export class ConfigureCorsService implements IBootService {
  constructor() {}
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    Logger.log("Booting Server - Configuring CORS", "ConfigureCorsService.boot");

    const corsOptions = {
      origin(origin, callback) {
          callback(null, true);
      },
      credentials: true
    };
    app.use(cors(corsOptions));

    var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');

      // OPTION 2
      // var allowedOrigins = ["http://localhost:4200", "http://app.elewa.co.ke", "http://app.elewa.co.ke:81"];
      // //https://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-nodejs/32481816#32481816
      // var origin = req.headers.origin;
      // if (allowedOrigins.indexOf(origin) > -1) {
      //   res.setHeader("Access-Control-Allow-Origin", origin);
      // }

      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,token');
      next();
    }
    app.use(allowCrossDomain);

    return true;
  }

}