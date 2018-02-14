import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthConfigService } from './auth-config.service';
import { AuthConfig } from '../model/interfaces/auth-config.interface';

export class JwtStrategy extends Strategy
{
  constructor(private readonly authConfig: AuthConfig) {
    
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: authConfigService.getAuthConfig(),
      },
        // Make sure requests are verified.
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    
    passport.use(this);
  }

  public async verify(req, payload, done) {
    const isValid = await this.authService.validateUser(payload);

    if (!isValid) {
      return done('User unauthorized', false);
    }
    done(null, payload);
  }
}