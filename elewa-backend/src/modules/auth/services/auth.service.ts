import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'

import { AuthConfig } from '../model/interfaces/auth-config.interface';
import { AuthConfigService } from './auth-config.service';

import * as bcrypt from 'bcrypt';

import { RefreshToken } from '../model/interfaces/refresh-token.interface';
import { AuthRequestDto } from '../model/interfaces/auth-request.interface';
import { UserService } from '../../user/model/services/user.service';
import { AuthResponseDto } from '../model/interfaces/auth-response.interface.dto';
import { User } from '../../user/model/interfaces/user.interface';
import { RolesService } from './roles.service';


@Component()
export class AuthService {

  private _authConfig: AuthConfig;

  constructor(private _authConfigService: AuthConfigService, 
              private _userService: UserService,
              private _rolesService: RolesService) {}

  async initAuthService() {
    // In consideration. 
    //  Currently on init -> Problem: Stays cached too long and config might change (but very infrequently)
    //  
    //  Strategies to consider:
    //      - Go fetch this in the database every time.
    //      - Refresh every night (when bearer token refresh)
    this._authConfig = await this._authConfigService.getAuthConfig();
  }

  async authenticate(req: AuthRequestDto): Promise<AuthResponseDto | false> {
    const user = await this._userService.findUserByLogin(req.login);
    if(!user) 
      return false;

    // Compare password used at login or 
                // passwords are stored hashed - https://github.com/kelektiv/node.bcrypt.js
    let match = bcrypt.compare(req.login, user.password);
    if(! match) 
      return false;

    return this._createAuthResponse(user);
  }

  private async _createAuthResponse(user: User): Promise<AuthResponseDto> {
    return {
      user: user.profile,
      userId: user._id,

      claims: this._rolesService.getClaims(user.role)
    }
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