import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'

import { AuthConfig } from '../model/interfaces/auth-config.interface';
import { AuthConfigService } from './auth-config.service';
import { AuthConfigRepository } from '../model/repositories/auth-config.repository';
import { RefreshToken } from '../model/interfaces/refresh-token.interface';
import { RefreshTokenRepository } from '../model/repositories/refresh-token.repository';
import { ObjectId } from 'bson';


@Component()
export class IssueBearerService {

  private _authConfig: AuthConfig;
  private _authConfigRepository : AuthConfigRepository;

  constructor(private _authConfigService: AuthConfigService, 
              private _refreshTokenRepository: RefreshTokenRepository) {}

  async initAuthService() {
    // In consideration. 
    //  Currently on init -> Problem: Stays cached too long and config might change (but very infrequently)
    //  
    //  Strategies to consider:
    //      - Go fetch this in the database every time.
    //      - Refresh every night (when bearer token refresh)
    this._authConfig = await this._authConfigService.getAuthConfig();
  }

  public async issueBearerToken(refreshToken: String): Promise<string | false> {
    try {
      // 1. Verify the token is valid (check signature)
      jwt.verify(refreshToken, this._authConfig.refreshTokenSecret);

      // 2. Get Refresh Token and match it with the one in database.
      let rToken :RefreshToken = jwt.decode(refreshToken).payload;

      if(await this._verifyTokenDb(rToken))
        return await this._issueBearer(rToken.userId);
    }
    catch(err) {
      console.log(err);
      // Verification or issueing failed.
      return false;
    }
  }

  /**
   * Verify if the secret in this refresh token matches the one in the database. 
   *  If so, this refresh token is valid (since signature has already been verified) 
   * 
   * This step is important since we can revoke refresh tokens (e.g. "log me out on all devices", user ban, ..). 
   *    If a refresh token has been revoked, this verification will fail.
   */
  private async _verifyTokenDb(rToken: RefreshToken) {
    let dbToken = await this._refreshTokenRepository.single({ _id: rToken._id });

    return dbToken.secret === rToken.secret 
            && dbToken.creationDate === rToken.creationDate
            && dbToken.userId === rToken.userId;
  }

  /**
   * Issues a bearer token for that user.
   * 
   * Bearer Token contains user id, profile and claims.
   *  It is used for stateless authentication and access to user info without constant roundtrip to the database on the server.
   */
  private async _issueBearer(userId: ObjectId): Promise<string> {
    return null; 
  }

}