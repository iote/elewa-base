import { Injectable } from '@angular/core';
import * as Store from 'store';

import { User } from '../../user/interfaces/user.interface';
import { BearerToken } from '../../../../../elewa-shared/token/bearer-token.interface';

import { UserService } from '../../user/services/user.service';
import { StorageService } from '../../bricks/services/storage.service';

const BEARER_STORAGE_NAME = 'bearer-token';

/**
 * Service that handles setting the bearer token and abstracting the user from it
 */
@Injectable()
export class AuthTokenService 
{
  /** Bearer Token */
  private _bearer :string;

  constructor(private _storageService: StorageService,
              private _userService: UserService) 
  { }

  /** Configure a Bearer Token */
  setBearer(rawToken: string) {
    
    this._bearer = rawToken;
    this._storageService.set(BEARER_STORAGE_NAME, rawToken);

    const token = this._decodeBearer(rawToken);

    const frontendUser = <User> Object.assign(token.user, { claims: token.claims });
    this._userService.updateUser(frontendUser);
  }

  getBearer(): string | boolean {
    return this._storageService.get(BEARER_STORAGE_NAME);
  }

  /** Remove a Bearer Token */
  flushBearer() {
    this._storageService.set(BEARER_STORAGE_NAME, false);
    this._bearer = null;
  }

  fullFlushBearer() {
    this.flushBearer();
    
    // Bearer Token is hooked to sys user.
    this._userService.flushUser();
  }

  /**
   * Decodes a raw bearer token and returns the payload.
   * 
   * @param rawToken Base64 encoded Bearer Token - Structure `header.payload.signature`
   */
  private _decodeBearer(rawToken: string) : BearerToken {

    // 1. Extract and decode <atob> the Base64 payload
    const payload = atob(rawToken.split('.')[1]);
    
    // 2. Transform string into POJO
    return JSON.parse(payload);
  }
}
