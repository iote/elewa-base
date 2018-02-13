import { Component, Inject } from '@nestjs/common';
import * as _ from 'underscore';

//
// Important: Create this file /data/auth-config.data.ts. 
//                Export const authConfig : AuthConfig = { an implementation of AuthConfig } 
// Invent the required secrets to ensure app is secure.
// auth-config.data File is gitignored for security purposes.
import { authConfig } from './data/auth-config.data';
import { AuthConfigRepository } from '../repositories/auth-config.repository';

@Component()
export class AuthConfigFixture {

  constructor(@Inject(AuthConfigRepository) private _authconfigRepo: AuthConfigRepository) {}

  async load(): Promise<boolean> {
    console.log("Loading Auth Config fixture");

    if((await this._authconfigRepo.findAll()).length > 0) 
    {
      console.log("Authentication has not yet been configured. Creating Authentication Config from data fixture");
      // To avoid misuse of the Auth Config Service, we only allow inserting into the db on first app launch
      // We therefore do a bit of an architecture hack here, and access the repository straight from a fixture.
      await this._authconfigRepo.insert(authConfig);
    }
    else
      console.log("Authentication already configured, moving on.");

    return true;
  }

}
