import { Injectable } from '@angular/core';
import { User } from '../../user/interfaces/user.interface';
import { BearerToken } from '../../../../../elewa-shared/token/bearer-token.interface';

import { UserService } from '../../user/services/user.service';
import { Subject } from 'rxjs/Subject';
import { StorageService } from '../../bricks/services/storage.service';
import { Logger } from '../../../providers/logger/logger.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const TOKEN_STORAGE_NAME = 'refresh-token';

/**
 * Service that handles setting the refresh token
 */
@Injectable()
export class RefreshTokenService 
{
  
  /** Bearer Token */
  private _token :BehaviorSubject<string | false>;

  private _refreshing = false;
  private _refreshPromise :Observable<Object>;

  constructor(private _http :HttpClient,
              private _storage: StorageService,
              private _logger : Logger) 
  {
    this._token = new BehaviorSubject<string | false>(this.getToken());
  }

  getBearerFromRefresh() {
    if(this._refreshing)
      this._logger.log(() => "Already requesting token. Return promise.");
    
    else {
      this._logger.log(() => "Requesting new Bearer Token from Refresh Token. Return promise.");

      this._refreshPromise   
                = this._http.post('/auth/token', { refreshToken: this._token.getValue() })

                    .map((resp :any) => 
                        this._getBearerFromResponse(resp))

                    .catch((err, caught) => 
                        this._checkRefreshTokenInvalid(err));
                    
      this._refreshing = true;
    }

    return this._refreshPromise;
  }

  private _getBearerFromResponse(resp: { token: string }) {
    this._token.next(resp.token);
    return resp.token;
  }

  private _checkRefreshTokenInvalid(err) {
    if (err instanceof HttpErrorResponse
        && err.status === 401)
    {
      this._token.next(false);
      return this._token;
    }
    else 
      return new ErrorObservable(err);
  }

  getToken() {
    return this._storage.get(TOKEN_STORAGE_NAME);
  }

  setToken(rawToken: string) {
    this._storage.set(TOKEN_STORAGE_NAME, rawToken);
    this._token.next(rawToken);
  }

  /** Remove a Bearer Token */
  flushToken() {
    this._storage.set(TOKEN_STORAGE_NAME, false);
    this._token.next(false);
  }
}
