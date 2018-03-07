import { Injectable } from '@angular/core';

import { BackendService } from '../../../providers/backend/backend.service';
import { AuthRequestDto } from 'elewa-shared/dto/auth/auth-request.dto.interface';


@Injectable()
export class AuthService {

  constructor(private _backend: BackendService) {}

  doLogin(req: AuthRequestDto) {
    return this._backend.doPost('/auth/login', req)
      .map(resp => { console.log(resp); return resp; });
  }

}
