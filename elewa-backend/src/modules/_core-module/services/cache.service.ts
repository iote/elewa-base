import * as cache from 'memory-cache';
import { Component } from '@nestjs/common';

/**
 * Cache component that can store and retrieve data.
 * 
 * Uses https://github.com/ptarjan/node-cache internally
 */
@Component()
export class CacheService {
  
  /* Create the cache on server load */
  private readonly _cache = new cache.Cache();

  /**
   * Simply stores a value and returns the cached value.
   * 
   * @param key 
   * @param value 
   * @param time Will remove the value in the specified time in seconds. Optional, if time isn't passed in it is stored forever.
   * @param callback callback is optional function fired after entry has expired with key and value passed (function(key, value) {})
   */
  put(key :string, value: any, time?: number, callback?:(string, any) => void) : any 
  {
                             // Uses time in ms, we in s
    this._cache.put(key, value, time * 1000, callback);
  }

  /**
   * Retrieves a value for a given key
   * If value isn't cached, returns null
   *
   * @param key 
   */
  get(key: string) : any | null 
  {
    return this._cache.get(key);
  }


  /**
   * Deletes a key, returns a boolean specifying whether or not the key was deleted.
   * 
   * @param key 
   */
  delete(key): boolean {
    return this._cache.del(key);
  }

}