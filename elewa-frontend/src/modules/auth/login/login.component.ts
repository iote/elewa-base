import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../../kernel/services/logger/logger.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: []
})
export class LoginComponent implements OnInit 
{
  constructor(private _logger: Logger) { }
  
  public ngOnInit(): void {
    this._logger.log(() => "LoginComponent Initialised");
  }
}
