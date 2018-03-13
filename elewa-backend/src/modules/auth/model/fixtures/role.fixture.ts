import { Component, Inject, Logger } from '@nestjs/common';
import * as _ from 'underscore';
import { RoleRepository } from '../repositories/role.repository';
import { roles } from './data/roles.data';

@Component()
export class RoleFixture {

  constructor(@Inject(RoleRepository) private _roleRepo: RoleRepository) {}

  async load(production: boolean): Promise<boolean> {

    if(!production) {
      /** Roles are constants that change frequently. Always remove all and add them again during development */
      Logger.log("Removing all roles to refresh claims during development.", "RoleFixture.load");
      await this._roleRepo.truncate();
    }
    
    if((await this._roleRepo.findAll()).length === 0) 
    {
      Logger.log("Roles have not yet been configured. Creating Role Config from data fixture.", "RoleFixture.load");
      await this._roleRepo.insertMany(roles);
    }
    else
      Logger.log("Roles already configured, moving on.", "RoleFixture.load");

    return true;
  }

}
