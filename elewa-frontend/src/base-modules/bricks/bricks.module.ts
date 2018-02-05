import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionTileComponent } from './components/action-tile/action-tile.component';

/**
 * Base reusable dumb front end components and directives. 
 * 
 * The components contained in this module have no dependencies at all, and can be reused in any project.
 */
@NgModule({
  imports:      [CommonModule],

  declarations: [ActionTileComponent],

  exports:      [ActionTileComponent],
})
export class BricksModule { }
