import { Component, OnInit, Inject } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Logger } from '../../../providers/logger/logger.service';
import { RegisterViewModel } from './register.viewmodel';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: ['#register-card { max-width: 700px; }', 'mat-card-content > * { width: 100%; }']
})
export class RegisterComponent implements OnInit 
{
  model = new RegisterViewModel();
  registerForm: NgForm;
  hide = true;

  constructor(private _logger: Logger) { }
  
  public ngOnInit(): void {
    this._logger.log(() => "RegisterComponent Initialised");
  }

  public register($event) {
    $event.preventDefault();
    console.log($event);
  }
}
