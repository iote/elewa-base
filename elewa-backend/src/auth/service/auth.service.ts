import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'

import { AuthConfigService } from './auth-config.service';
import { AuthConfig } from './data/auth-config';


@Component()
export class AuthService {

  private _authConfig: AuthConfig;

  constructor(authConfigService: AuthConfigService) {
    this._authConfig = authConfigService.getAuthConfig();
  }

  async createToken() {
    const user = { email: 'thisis@example.com' };
    // JWT strategy. Sign user token and his/her authorisation claims with secret key stored in database.
    //    Advantage is that key signing reduces the load to the database since per every authorisation request
    //    we don't have to make round trip to the database to check if user has required claim. 
    //
    //    We can just decrypt token, get claims and match claim on authorisation.
    const token = jwt.sign(user, this._authConfig.secretKey, { expiresIn: this._authConfig.expiresIn });
    
    return {
      expires_in: this._authConfig.expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}