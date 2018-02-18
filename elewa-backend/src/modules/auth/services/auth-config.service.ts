import { Component, Inject } from '@nestjs/common';
import { AuthConfigRepository } from '../model/repositories/auth-config.repository';
import { AuthConfig } from '../model/interfaces/auth-config.interface';
import { CacheService } from '../../_core-module/services/cache.service';

@Component()
export class AuthConfigService 
{

  constructor(private readonly _repo : AuthConfigRepository,
              private readonly _cache: CacheService)
  {}

  async getAuthConfig(): Promise<AuthConfig>
  {
    const fromCache = this._cache.get('authConfig');
    if(fromCache)
      return fromCache;
    
    // There is only one auth configuration object in the database.
    const authConfig = await this._repo.single({});

    // Refresh every 1 hour.
    this._cache.put('authConfig', authConfig, 60*60);
    
    return authConfig;
  }
  
}
