import { Component, OnInit } from '@angular/core';

import { Logger } from '../../../../providers/logger/logger.service';

/**
 * App home component. Decides on what the logged in user gets to see.
 */ 
@Component({
  selector: 'ele-home',
  templateUrl: './home.component.html', 
  styleUrls: []
})
export class HomeComponent implements OnInit {

  constructor(private _logger: Logger) { }
  
  ngOnInit () {
      this._logger.log(() => 'App Home Loaded. Loading Subject Selection Screen.');
      
  }
}
