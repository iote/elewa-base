import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'
import { ObjectId } from 'bson';

import { AuthConfig } from '../model/interfaces/auth-config.interface';
import { AuthConfigService } from './auth-config.service';

import { RefreshToken } from '../model/interfaces/refresh-token.interface';
import { RefreshTokenRepository } from '../model/repositories/refresh-token.repository';
import { uuid } from 'uuid/v4';
import { authConfig } from '../model/fixtures/data/auth-config.data';

/**
 * The IssueRefreshTokenService is responsible for issueing refresh tokens. A refresh token is needed
 *  to authorise a refresh over the long term of the application.
 */
@Component()
export class RefreshTokenService {

  constructor(private _authConfigService: AuthConfigService, 
              private _refreshTokenRepository: RefreshTokenRepository) {}

  /**
   * Issueing of a refresh token.
   * Only occurs on login, so calls to database will not hinder long term performance.
   * 
   * @param refreshToken 
   */
  public async issue(userId: ObjectId): Promise<string> {
    
    let authConfig = await this._authConfigService.getAuthConfig();

    const payload :RefreshToken = {
      
      issueDate: new Date(), // TODO, decouple from JS Date new() operation.
      handshake: uuid.v4(),
      refreshConfigId: authConfig._id,
      userId: userId,
      
      // machineName - create functionality where users can name a machine later
    };

    // Save the token in the database. This will be used to verify 
    const tokenWithId = await this._refreshTokenRepository.insert(payload);

    // Create the token by signing with the refresh token secret.
    const token = jwt.sign(payload, authConfig.refreshTokenSecret, { expiresIn: authConfig.refreshTokenExpiry });

    return token;
  }

}