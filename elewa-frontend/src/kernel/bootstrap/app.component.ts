import { Component, OnInit } from '@angular/core';

import { Logger } from '../services/logger/logger.service';

/**
 * Root component. Defines location of route handler.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';
  _logger: Logger;

  public constructor(logger: Logger) {
    this._logger = logger;
  }

  public ngOnInit(): void {
    this._logger.debug( () => "Application initialised." );
  }
}
