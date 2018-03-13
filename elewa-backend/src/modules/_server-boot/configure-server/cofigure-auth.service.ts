import { Component, Inject, Logger }     from '@nestjs/common';
import { IBootService } from '../boot-service.interface';
import { INestApplication } from '@nestjs/common/interfaces';

import { AuthModule } from '../../auth/auth.module';
import { HttpClaimsGuard } from '../../auth/gaurds/http-claims.guard';
import { AuthConfigService } from '../../auth/services/auth-config.service';
import { production } from '../../../base/config/production';
import * as passport from 'passport';

@Component()
export class ConfigureAuthService implements IBootService {
  constructor() {}
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    Logger.log("Configuring Authorisation - Claims Guard", "ConfigureAuthService.boot");

    // this._setGuard(app);

    return true;
  }

  /* Global guard causes bug #1 - Instead decorate every controller or they will by default be anonymous!
  private _setGuard(app: INestApplication): void {
    const authGuard = app.select(AuthModule)
                         .get(HttpClaimsGuard);

    app.useGlobalGuards(authGuard);
  }*/

}