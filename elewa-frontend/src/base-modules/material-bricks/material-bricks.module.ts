import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialDesignModule } from '../material-design/material-design.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageComponent } from './components/page/page.component';
import { FlexLayoutModule } from '../flex-layout/flex-layout.module';
import { FrameComponent } from './components/frame/frame.component';

/**
 * Base reusable dumb front end components and directives. 
 * 
 * The components and directives in this module are dependent on Angular Material.
 */
@NgModule({
  imports:      [CommonModule, MaterialDesignModule, FlexLayoutModule],

  declarations: [NavbarComponent, PageComponent, FrameComponent],

  exports:      [NavbarComponent, PageComponent, FrameComponent],
})
export class MaterialBricksModule {
 
}
