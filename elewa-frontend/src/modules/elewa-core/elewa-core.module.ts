import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from './material-design/material-design.module';

import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Module that imports all the modules used by all other modules in the elewa system.
 * The module also defines some commonly used UI components
 * 
 * Acting as base import, and layer of indirection.
 */
@NgModule({
  imports:      [CommonModule, 
                 MaterialDesignModule],

  declarations: [NavbarComponent],

  exports:      [CommonModule, 
                 MaterialDesignModule,
                 NavbarComponent],
})
export class ElewaCoreModule { }
