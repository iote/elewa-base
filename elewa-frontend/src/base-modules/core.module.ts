import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BricksModule } from './bricks/bricks.module';

import { MaterialDesignModule } from './material-design/material-design.module';
import { MaterialBricksModule } from './material-bricks/material-bricks.module';
import { FlexLayoutModule } from './flex-layout/flex-layout.module';

/**
 * Module that imports all the modules used by all other modules in the elewa system.
 * The module defines some commonly used UI components and services, and makes them available.
 * 
 * Acts as a base import, and layer of indirection of all exported libraries.
 */
@NgModule({
  imports:      [CommonModule, 
                 FlexLayoutModule,
                 MaterialDesignModule,
                 BricksModule,
                 MaterialBricksModule],

  // This export in fact decouples these modules from the actual modules, for the modules importing them.
  // The modules importing the Base Module do not have to care about which library 
  //  is used to provide e.g. mat-toolbar
  //      -> Could be Angular Material Library that provides the component,
  //         but we can also decide to export our own version of e.g. mat-toolbar.
  //        
  //         For the module importing base, it doesnt matter since it will have access to 'a' mat-toolbar.
  exports:      [CommonModule, 
                 MaterialDesignModule,
                 FlexLayoutModule,
                 BricksModule, 
                 MaterialBricksModule],
})
export class CoreModule { }
