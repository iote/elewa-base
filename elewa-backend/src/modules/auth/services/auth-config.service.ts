import { Component, Inject } from '@nestjs/common';
import { AuthConfigRepository } from '../model/repositories/auth-config.repository';
import { AuthConfig } from '../model/interfaces/auth-config.interface';



@Component()
export class AuthConfigService {

  constructor(@Inject(AuthConfigRepository) private readonly _repo: AuthConfigRepository) {}

  async getAuthConfig(): Promise<AuthConfig>
  {
    // There is only one auth configuration object in the database.
    return await this._repo.single({});
  }
}
