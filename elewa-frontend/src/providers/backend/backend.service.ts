import { Injectable } from '@angular/core';

import { Logger } from '../logger/logger.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { SERVICE_LOCATIONS } from '../../app/environment/service-locations.const';
import { HttpClient } from '@angular/common/http';
import { HttpRequestOptions } from 'apollo-angular-link-http/types';


/**
 * Communication Service that facilitates all access to the backend 
 */
@Injectable()
export class BackendService {

  public constructor(private _http: HttpClient,
                     private _logger: Logger) 
  { }

  
  public doGet(route: string, options: HttpRequestOptions) : Observable<any> {
    return this._http.get(SERVICE_LOCATIONS.SERVICE + route, options);
  }

  public doPost(route: string, options: HttpRequestOptions) : Observable<any> {
    return this._http.post(SERVICE_LOCATIONS.SERVICE + route, options);
  }

}
