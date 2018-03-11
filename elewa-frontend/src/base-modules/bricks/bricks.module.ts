import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionTileComponent } from './components/action-tile/action-tile.component';
import { SpacerComponent } from './components/spacer/spacer.component';
import { StorageService } from './services/storage.service';

/**
 * Base reusable dumb front end components and directives. 
 * 
 * The components contained in this module have no dependencies at all, and can be reused in any project.
 */
@NgModule({
  imports:      [CommonModule],

  declarations: [ActionTileComponent, SpacerComponent],

  providers: [ StorageService ],

  exports:      [ActionTileComponent, SpacerComponent],
})
export class BricksModule { }
