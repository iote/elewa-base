import { Component, OnInit, Inject, Input, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

import { Logger } from "../../../../providers/logger/logger.service";
import { TransclusionHelper } from '../../../../providers/transclusion-helper/transclusion-helper.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ThemingService } from '../../../../providers/theming/theming.service';


@Component({
  selector:    'app-page',
  templateUrl: './page.component.html', 
  styles: ['.spin-holder { width: 50px; height: 50px;}']
})
export class PageComponent implements OnInit, OnDestroy {
  
  @Input() loading = false;

  private _slug = new BehaviorSubject<string>("default");

  @Input()  set slug(value) { this._slug.next(value); }
            get slug()      {  return this._slug.getValue(); }

  theme: string;

  constructor(private _logger: Logger, 
              private _themingService: ThemingService)
  {} 
 
  ngOnInit() {
    this._logger.debug(() => "Page initialised. Loading components.");  

    this._slug.subscribe(s => { 
                          this._themingService.setSubjectTheme(s);
                          this.theme = s + '-theme'; // slug + theme should be encapsulated in service. Too much work for limited use cases.
    });
  }

  ngOnDestroy() {
      this._themingService.setDefault();
  }
}
