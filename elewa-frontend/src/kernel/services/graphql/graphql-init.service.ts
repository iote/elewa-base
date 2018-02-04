import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger.service';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { SERVICE_LOCATIONS } from '../service-locations.const';

/**
 * Root component. Defines location of route handler.
 */
@Injectable()
export class GraphqlInitService {

  public constructor(private _apollo: Apollo, 
                     private _httpLink: HttpLink, 
                     private _logger: Logger) 
  { }

  public initGraphql(): void {
    this._logger.log(() => "Creating Link with Graphql Backend");

    this._apollo.create({
      link: this._httpLink.create({ uri: SERVICE_LOCATIONS.GRAPHQL }),
      cache: new InMemoryCache()
    });
  }

}
