import { Component, OnInit, Renderer2 } from '@angular/core';

import { Logger } from '../providers/logger/logger.service';
import { ThemingService } from '../providers/theming/theming.service';

/**
 * Root component. Defines location of route handler.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';

  public constructor(private _logger: Logger, 
                     private _themer: ThemingService, 
                     renderer: Renderer2) { 
    // Initialise theming engine.
    this._themer.initThemingService(renderer);
  }

  public ngOnInit(): void {
    this._themer.setDefault();
    this._logger.debug( () => "Application initialised." );
  }
}
