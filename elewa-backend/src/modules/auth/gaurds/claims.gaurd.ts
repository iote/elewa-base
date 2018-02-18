import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import * as jwt from 'jsonwebtoken';

import { BearerToken } from '../model/interfaces/bearer-token.interface';
import { AuthConfigService } from '../services/auth-config.service';
import { ExtractJwt } from 'passport-jwt';
import * as _ from 'underscore';

/**
 * Guard implementing claims based authorisation. Needs to be extended with token extraction strategy.
 * 
 * Only users with the claims (signed so verified) that give them access,
 *  can access guarded places of the application.
 */
export abstract class ClaimsGuard implements CanActivate
{
  constructor(private readonly _authConfigService : AuthConfigService,
              private readonly _reflector: Reflector,
              private readonly _extractor: (any) => string) 
  { }

  /**
   * Guard check.
   * 
   * @param dataOrRequest - Data object used to extract the token from.
   * @param context - Execution context
   * 
   * @see   this._extractor - Takes data as an argument and produces the jwt token from there.
   */
  async canActivate(requestOrData: any, context: ExecutionContext): Promise<boolean>
  {
    const token = this._extractor(requestOrData); 
    
    if(!token) return false;

                      // Cached. Crucial for performance reasons (this code will be executed almost every request!)
    const authConfig = await this._authConfigService.getAuthConfig();

    const bearer = <BearerToken> await jwt.verify(token, authConfig.bearerTokenSecret);
    
    if(!bearer) return false;

    return this._confirmClaim(bearer, context);
  }

  private _confirmClaim(token: BearerToken, context: ExecutionContext): boolean 
  {
    const { parent, handler } = context;

    // Get claims on controller / graphql resolver level
    const classClaims   = this._reflector.get<string[]>('claims', parent)  || [];
    // Get claims on method / property level
    const methodClaims  = this._reflector.get<string[]>('claims', handler) || [];

    const claims = classClaims.concat(methodClaims);

    return this._tokenHasClaims(token, claims);
  }

  /**
   * Logic that determines how claims are going to be used.
   * 
   * Do we require a user to have all claims for that class and method? - Most restrictive 'AND'-like approach.
   * Do we require a user to have only one of the claims on either class or method level - 'OR'-like appoach.
   * 
   * We opt for the most restrictive one on our server.
   */
  private _tokenHasClaims(token: BearerToken,claims: String[]) 
  {
    // AND-approach
    return claims.length === _.intersection(token.claims, claims).length;

    // OR-approach
    //return _.intersection(token.claims, claims)
    //        .length > 0;
  }
}