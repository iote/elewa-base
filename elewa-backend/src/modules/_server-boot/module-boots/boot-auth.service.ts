import { Component, Inject }     from '@nestjs/common';

import { INestApplication } from '@nestjs/common/interfaces';
import { IBootService } from '../boot-service.interface';

import { AuthConfigFixture } from '../../auth/model/fixtures/auth-config.fixture';
import { RoleFixture } from '../../auth/model/fixtures/role.fixture';

@Component()
export class BootAuthService implements IBootService {
  constructor(@Inject(AuthConfigFixture) private _authConfigFixture :AuthConfigFixture,
              @Inject(RoleFixture) private _roleFixture :RoleFixture) 
  {}
  
  async boot(app: INestApplication, production: boolean): Promise<boolean> {
    
    console.log("Booting Auth Module");

    await this._authConfigFixture.load();
    await this._roleFixture.load(production);

    return true;       // && await ..
  }

}