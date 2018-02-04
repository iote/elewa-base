import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger.service';

import { Apollo } from 'apollo-angular';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ApolloQueryResult, WatchQueryOptions } from 'apollo-client';

import { QueryOptions } from './query-options.interface';

/**
 * Graphql 
 */
@Injectable()
export class GraphqlService {

  public constructor(private _apollo: Apollo,
                     private _logger: Logger) 
  { }

  /**
   * Execute query. Will only return query results.
   * 
   * For full response object, @see doQueryRaw
   * 
   * @param options Query Option Object @see QueryOptions
   */
  public doQuery(options: QueryOptions) : Observable<any> {
    return this.doQueryRaw(options)
                       .map(q => q.data);
  }

  /**
   * Execute query. Will return full query results.
   * Query results are contained in the data property. 
   * 
   * @param options Query Option Object @see QueryOptions
   */
  public doQueryRaw(options: QueryOptions) : Observable<any> {
    return this._apollo.query(options);
  }
}
