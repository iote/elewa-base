import { Component, Inject } from '@nestjs/common';
import * as _ from 'underscore';
import { RoleRepository } from '../repositories/role.repository';
import { roles } from './data/roles.data';

@Component()
export class RoleFixture {

  constructor(@Inject(RoleRepository) private _roleRepo: RoleRepository) {}

  async load(production: boolean): Promise<boolean> {

    if(!production) {
      /** Roles are constants that change frequently. Always remove all and add them again during development */
      console.log("Removing all roles to refresh claims during development.");
      this._roleRepo.truncate();
    }
    
    if((await this._roleRepo.findAll()).length === 0) 
    {
      console.log("Roles have not yet been configured. Creating Role Config from data fixture.");
      await this._roleRepo.insertMany(roles);
    }
    else
      console.log("Roles already configured, moving on.");

    return true;
  }

}
