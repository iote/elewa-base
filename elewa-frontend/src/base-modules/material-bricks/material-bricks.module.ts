import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '../material-design/material-design.module';
import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Base reusable dumb front end components and directives. 
 * 
 * The components and directives in this module are dependent on Angular Material.
 */
@NgModule({
  imports:      [CommonModule, MaterialDesignModule],

  declarations: [NavbarComponent],

  exports:      [NavbarComponent],
})
export class MaterialBricksModule { }
