import { NgModule } from '@angular/core';

import { ElewaCoreModule } from '../elewa-core/elewa-core.module';
import { AppHomeComponent } from './components/app-home/app-home.component';

/**
 * Module that imports all the modules used by all other modules in the elewa system.
 * The module also defines some commonly used UI components
 * 
 * Acting as base import, and layer of indirection.
 */
@NgModule({
  imports:      [ElewaCoreModule],

  declarations: [AppHomeComponent],

  exports:      [],
})
export class HomeModule { }
