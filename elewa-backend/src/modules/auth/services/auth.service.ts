import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'

import { AuthConfig } from '../model/interfaces/auth-config.interface';
import { AuthConfigService } from './auth-config.service';
import { AuthConfigRepository } from '../model/repositories/auth-config.repository';


@Component()
export class AuthService {

  private _authConfig: AuthConfig;
  private _authConfigRepository : AuthConfigRepository;

  constructor(private _authConfigService: AuthConfigService) {}

  async initAuthService() {
    // In consideration. 
    //  Currently on init -> Problem: Stays cached too long and config might change (but very infrequently)
    //  
    //  Strategies to consider:
    //      - Go fetch this in the database every time.
    //      - Refresh every night (when bearer token refresh)
    this._authConfig = await this._authConfigService.getAuthConfig();
  }

  createBearerToken(arg0: any): any {
    throw new Error("Method not implemented.");
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