import { Injectable } from '@angular/core';

import * as store from 'store';
import { Logger } from '../../../providers/logger/logger.service';

@Injectable()
export class StorageService {

  constructor(private _logger: Logger) {}

  put(name: string, obj: any) {
    this.set(name, obj);
  }

  set(name: string, obj: any) {
    this._logger.log(() => "StorageService: Storing { " + name + ": " + obj + "; }.");

    store.set(name, obj);
  }

  get(name: string) :any {
    this._logger.log(() => "StorageService: Retrieving " + name + " from store.");
    
    return store.get(name, false);
  }


}
