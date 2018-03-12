import { Injectable } from '@angular/core';

import { BackendService } from '../../../providers/backend/backend.service';
import { AuthRequestDto } from 'elewa-shared/dto/auth/auth-request.dto.interface';
import { RefreshTokenService } from '../../../base-modules/auth-primitives/services/refresh-token.service';
import { AuthTokenService } from '../../../base-modules/auth-primitives/services/auth-token.service';


@Injectable()
export class AuthService {

  constructor(private _backend: BackendService,
              private _refreshTokenService: RefreshTokenService,
              private _bearerService: AuthTokenService) {}

  doLogin(req: AuthRequestDto) {
    return this._backend.doPost('/auth/login', req)
      .map(resp => { this._setTokens(resp); return resp; });
  }

  private _setTokens(resp: {refreshToken: string, bearerToken: string}) {
    this._refreshTokenService.setToken(resp.refreshToken);
    this._bearerService.setBearer(resp.bearerToken);
  }

}
