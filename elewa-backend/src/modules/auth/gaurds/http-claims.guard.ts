import { Guard, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import * as jwt from 'jsonwebtoken';

import { BearerToken } from 'elewa-shared/token/bearer-token.interface';
import { AuthConfigService } from '../services/auth-config.service';
import { ExtractJwt } from 'passport-jwt';
import { ClaimsGuard } from './claims.gaurd';

/**
 * Guard implementing claims based authorisation, on direct HTTP endpoints. 
 * 
 * Only users with the claims (signed so verified) that give them access,
 *  can access guarded places of the application.
 */
@Guard()
export class HttpClaimsGuard extends ClaimsGuard
{
  constructor(authConfigService : AuthConfigService,
              reflector: Reflector)
  {
    super(authConfigService, reflector, ExtractJwt.fromAuthHeaderAsBearerToken())
  }
}