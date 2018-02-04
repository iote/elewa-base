import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ActionTileComponent } from './components/action-tile/action-tile.component';

import * as MATERIAL_MODULES from '@angular/material';
// src= https://stackoverflow.com/questions/45166844/how-to-import-angular-material-in-project
export function mapMaterialModules() {
  return Object.keys(MATERIAL_MODULES).filter((k) => {
    const asset = MATERIAL_MODULES[k];
    return typeof asset === 'function'
      && asset.name.startsWith('Mat')
      && asset.name.includes('Module');
  }).map((k) => MATERIAL_MODULES[k]);
}
const modules = mapMaterialModules();


/**
 * Module that imports all the modules we use from angular material.
 * We export these modules and import them back into the main application.
 * 
 * Doing so, we make them available to the whole application. 
 * 
 */
@NgModule({
  declarations: [ActionTileComponent],
  imports: [CommonModule].concat(modules),
  exports: modules.concat([ActionTileComponent])
})
export class MaterialDesignModule { }
