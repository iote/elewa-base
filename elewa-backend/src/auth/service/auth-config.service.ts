import { Component } from '@nestjs/common';
import { AuthConfig } from './data/auth-config';

@Component()
export class AuthConfigService {

  getAuthConfig(): AuthConfig {
            // Todo: Move these settings to a database for security.
    return new AuthConfig(60 * 60, 'aSecretKey');
  }

}
