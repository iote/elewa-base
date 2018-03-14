import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger.service';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { createHttpLink } from "apollo-link-http";

import { _throw } from 'rxjs/observable/throw';

import { SERVICE_LOCATIONS } from '../../app/environment/service-locations.const';
import { AuthTokenService } from '../../base-modules/auth-primitives/services/auth-token.service';
import { RefreshTokenService } from '../../base-modules/auth-primitives/services/refresh-token.service';
import { ApolloLink } from 'apollo-link';
import { Observable } from 'apollo-client/util/Observable';
import { Router } from '@angular/router';

import { onError } from "apollo-link-error";

/**
 * Root component. Defines location of route handler.
 */
@Injectable()
export class GraphqlInitService {

  public constructor(private _apollo: Apollo, 
                     private _httpLink: HttpLink,
                     private _authTokenService: AuthTokenService,
                     private _refreshTokenService: RefreshTokenService,
                     private _logger: Logger) 
  { 
  }

  private _refreshingPromise: any;

  private _setHeader(options, token) {
    console.log("Setting Header");
    if(token)
      options.headers.authorization = `Bearer ${token}`;
  }

  private _graphqlFetch(uri, options)
  {
    this._logger.log(() => "Doing Graphql Request.");

    this._setHeader(options, this._authTokenService.getBearer());
    const initialRequest = fetch(uri, options);
    
    return initialRequest
      .then(response => { 
        const unReadResp = response.clone(); // Avoid bug - Response cannot be read twice
        return response.json()
          .then(json => { 
            return { response: unReadResp, data: json };
          }); 
      })
      .then((respAndData) => {
        if(respAndData.data.errors && respAndData.data.errors.length > 0 )
          if(respAndData.data.errors[0].message === "jwt expired" 
              || (respAndData.data.errors[0].message === "Forbidden resource" && !this._authTokenService.getBearer()))
          {
            this._logger.log(() => "Graphql. Jwt expired. Requesting new token and trying again.");

            return this._createReturnPromise(uri, options, respAndData.data);
          }
          else if (respAndData.data.errors[0].message === "Forbidden resource") {
            // Todo: Make user aware he/she has no access to the resource.
          }
        
        this._logger.log(() => "Graphql. Request success. Returning Graphql result.");
        return respAndData.response;
      })
      // Flatmap the promise and return the result.
      .then(a =>  a);
  }

  _createReturnPromise(uri, options, response) {
    if(this._refreshingPromise == null)
      this._refreshingPromise = this._refreshTokenService.getBearerFromRefresh();
    
    return this._refreshingPromise
                    .map(token =>
                          this._retryReqs(uri, options, response, token))
                    .toPromise();
  }

  _retryReqs(uri, options, response, token) {
    this._refreshingPromise = null;

    if(token) {
      this._setHeader(options, this._authTokenService.getBearer());
      return this._graphqlFetch(uri, options);
    }

    return false;
  }

  
  public initGraphql(): void {

    this._logger.log(() => "Creating Link with Graphql Backend");

    const httpLink = createHttpLink({ 
      uri: SERVICE_LOCATIONS.GRAPHQL, 
      fetch: this._graphqlFetch.bind(this)
    });

    this._apollo.create({
      link: httpLink,
      cache: new InMemoryCache()
    });
  }

}
