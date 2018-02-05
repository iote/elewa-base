import { Route, Router, RouterModule, PreloadingStrategy } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';

/**
 * Custom preloading strategy, allowing us to choose for which modules to preload based on a route payload.
 * 
 * Src: https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb
 */
export class ElewaPreloadStrategy implements PreloadingStrategy 
{
  preload(route: Route, load: Function): Observable<any>
  {
    // This code enable
    return route.data && route.data.preload ? load() : of(null);
  }
}
