import {OverlayContainer} from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Renderer2 } from '@angular/core';

const DEFAULT_THEME = 'default-theme';

/**
 * Theming Service
 * 
 * Enables theming throughout the application. Depends on Angular Material.
 */
@Injectable()
export class ThemingService 
{
  private _topContainerClassList: DOMTokenList; 
  /** Needs to be set in application root! - src: https://stackoverflow.com/questions/43070308/using-renderer-in-angular-4 */
  private _renderer: Renderer2;
  
  private _theme = DEFAULT_THEME;

  constructor(overlayContainer: OverlayContainer) { 
    this._topContainerClassList = overlayContainer
                                    .getContainerElement()
                                    .classList;
  }

  public initThemingService(renderer: Renderer2) {
    this._renderer = renderer;
    this.setDefault();
  }

  public setTheme(themeName: string) 
  {
    this._setTheme(themeName);
  }

  public setSubjectTheme(slug: string) {
    this._setTheme(slug + '-theme');
  }

  public setDefault() {
    this._setTheme(DEFAULT_THEME);
  }

  private _setTheme(newTheme: string) {
    this._topContainerClassList.remove(this._theme);
    this._renderer.removeClass(document.body, this._theme);

    this._theme = newTheme;

    this._topContainerClassList.add(this._theme);
    this._renderer.addClass(document.body, this._theme);
  }
}
