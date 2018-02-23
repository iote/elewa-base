import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'

import { AuthRequestDto } from 'elewa-lms-shared/dto/auth-request.dto.interface';
import { AuthResponseDto } from 'elewa-lms-shared/dto/auth-response.dto.interface';
import { RegisterRequestDto } from 'elewa-lms-shared/dto/register-request.dto.interface';
import { BearerRequestDto } from 'elewa-lms-shared/dto/bearer-request.dto.interface';

import { AuthConfig } from '../model/interfaces/auth-config.interface';
import { AuthConfigService } from './auth-config.service';

import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/model/services/user.service';
import { RolesService } from './roles.service';
import { RefreshTokenService } from './refresh-token.service';
import { BearerTokenService } from './bearer-token.service';
import { User } from '../../user/model/interfaces/user.interface';
import { RefreshToken } from '../model/interfaces/refresh-token.interface';
import { BearerToken } from '../model/interfaces/bearer-token.interface';


@Component()
export class AuthService {

  constructor(private _userService: UserService,
              private _rolesService: RolesService,
            
              private _refreshTokenService: RefreshTokenService,
              private _bearerTokenService: BearerTokenService) {}

  async authenticate(req: AuthRequestDto): Promise<AuthResponseDto | false> {
    const user = await this._userService.findUserByLogin(req.login);
    if(!user) 
      return false;

    // Compare password used at login or 
                // passwords are stored hashed - https://github.com/kelektiv/node.bcrypt.js
    let match = bcrypt.compare(req.login, user.password);
    if(! match) 
      return false;
      
    // User successfully logged in. Create refresh and bearer token.
    let refreshToken = await this._refreshTokenService.issue(user._id);
    let bearerToken = <string> await this._bearerTokenService.issue(refreshToken); // Possible future performance optimalisation - Pass user and config already.

    return {
      userId: user._id,

      bearerToken: bearerToken,
      refreshToken: refreshToken,
    }
  }

  async register(regReq: RegisterRequestDto): Promise<User> {

    if(await this._userService.userExists(regReq.login))
      throw new Error("Duplicate user. A user with that login already exists!");

    return this._userService
                  .createFromRegistration(regReq);
  }

  async issueBearer(reqBearer: BearerRequestDto): Promise<string | false> 
  {
    return this._bearerTokenService
                    .issue(reqBearer.refreshToken);
  }
}