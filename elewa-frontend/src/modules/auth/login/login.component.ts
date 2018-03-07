import { Component, OnInit, Inject } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Logger } from '../../../providers/logger/logger.service';
import { AuthService } from '../services/auth.service';
import { AuthRequestDto } from 'elewa-shared/dto/auth/auth-request.dto.interface';

import { CreateLoginViewModel } from './login.viewmodel';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: ['#login-card { max-width: 700px; }', 'mat-card-content > *, .password-holder > * { width: 100%; }']
})
export class LoginComponent implements OnInit 
{
  loginForm: FormGroup;
  hide = true;

  constructor(private _authService: AuthService,
              fb: FormBuilder,
              private _router: Router,
              private _logger: Logger) { 
    this.loginForm = CreateLoginViewModel(fb);
  }
  
  public ngOnInit(): void {
    this._logger.log(() => "LoginComponent Initialised");
  }

  public login() {
    if(this.loginForm.status === 'VALID') {
      this._logger.log(() => "Logging in user.");
      this._logger.debug(() => this.loginForm.value);


      const loginReq = this._prepareLogin();

      this._authService.doLogin(loginReq).subscribe(_ => this._goToHome());
    }
    else
      this._logger.error(() => "Cannot perform registration. Form is not yet valid.");
  }

  private _goToHome() {
    this._router.navigate(['/']);
  }
  
  private _prepareLogin(): AuthRequestDto {
    
    return {
      login: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };
  }
}
