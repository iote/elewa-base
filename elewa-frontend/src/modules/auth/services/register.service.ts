import { BackendService } from '../../../providers/backend/backend.service';
import { RegisterRequestDto } from 'elewa-shared/dto/auth/register-request.dto.interface';

export class RegisterService {

  constructor(private _backend: BackendService) {}

  public doRegistration(registrationDto: RegisterRequestDto) {
    return this._backend.doPost('/auth/register', registrationDto);
  }
}
