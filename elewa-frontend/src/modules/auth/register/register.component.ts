import { Component, OnInit, Inject } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Logger } from '../../../providers/logger/logger.service';
import { RegisterViewModel } from './register.viewmodel';
import { PasswordValidation } from '../../../base-modules/reactive-form-extensions/match-password.validator';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: ['#register-card { max-width: 700px; }', 'mat-card-content > *, .password-holder > * { width: 100%; }']
})
export class RegisterComponent implements OnInit 
{
  registerForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private _logger: Logger) { 
    this.registerForm = RegisterViewModel.CreateForm(fb);
  }
  
  public ngOnInit(): void {
    this._logger.log(() => "RegisterComponent Initialised");
  }

  public register() {
    if(this.registerForm.status === 'VALID') {
      this._logger.log(() => "User created valid register form. Registering user.");
      this._logger.debug(() => this.registerForm);
    }
  }


}
