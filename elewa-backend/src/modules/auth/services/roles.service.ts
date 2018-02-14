import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common'
import { RoleRepository } from '../model/repositories/role.repository';

/**
 * The IssueBearerService is responsible for issueing bearer tokens. A refresh token is needed
 *  to authorise the refresh.
 */
@Component()
export class RolesService {
  
  constructor(private _roleRepository: RoleRepository) {}

  async getClaims(slug: string) {
    const role = await this._roleRepository.trySingle({ slug });
      // Occurs if role of user in database does not correspond to the slug of an actual role
    if(!role) {
      console.error("RoleService.getClaims: User role does not exist. Please contact system administrator!");
      return [];
    }

    return role.claims;
  }
  
}