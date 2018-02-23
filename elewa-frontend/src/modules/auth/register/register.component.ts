import { Component, OnInit, Inject } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Logger } from '../../../providers/logger/logger.service';
import { RegisterViewModel } from './register.viewmodel';
import { PasswordValidation } from '../../../base-modules/reactive-form-extensions/match-password.validator';
import { RegisterRequestDto } from 'elewa-shared/dto/auth/register-request.dto.interface';
import { RegisterService } from '../services/register.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: ['#register-card { max-width: 700px; }', 'mat-card-content > *, .password-holder > * { width: 100%; }']
})
export class RegisterComponent implements OnInit 
{
  registerForm: FormGroup;
  hide = true;

  constructor(private _registrationService: RegisterService,
              fb: FormBuilder,
              private _router: Router,
              private _logger: Logger) { 
    this.registerForm = RegisterViewModel.CreateForm(fb);
  }
  
  public ngOnInit(): void {
    this._logger.log(() => "RegisterComponent Initialised");
  }

  public register() {
    if(this.registerForm.status === 'VALID') {
      this._logger.log(() => "User created valid register form. Registering user.");
      this._logger.debug(() => this.registerForm);


      const regReq = this._prepareRegistration();

      this._registrationService.doRegistration(regReq).subscribe(_ => this._goToLogin());
    }
    else
      this._logger.error(() => "Cannot perform registration. Form is not yet valid.");
  }

  private _goToLogin() {
    this._router.navigate(['/login']);
  }
  
  private _prepareRegistration(): RegisterRequestDto {
    
    return {
      login: this.registerForm.get('username').value,
      password: this.registerForm.get('password.password').value,

      firstName: this.registerForm.get('name.fName').value,
      lastName: this.registerForm.get('name.lName').value,

      email: this.registerForm.get('email').value,
      telephone: this.registerForm.get('telephone').value,

      empNo: this.registerForm.get('empNo').value,
      idNo: this.registerForm.get('idNo').value,
      
      role: this.registerForm.get('role').value

    };
  }
}
