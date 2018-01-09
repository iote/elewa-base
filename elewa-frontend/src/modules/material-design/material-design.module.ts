import { MatToolbarModule, MatTabsModule, MatCardModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';

/**
 * Module that imports all the modules we use from angular material.
 * We export these modules and import them back into the main application.
 * 
 * Doing so, we make them available to the whole application. 
 * 
 */
@NgModule({
  imports: [MatToolbarModule, MatTabsModule, MatCardModule, MatButtonModule, MatCheckboxModule],
  exports: [MatToolbarModule, MatTabsModule, MatCardModule, MatButtonModule, MatCheckboxModule],
})
export class MaterialDesignModule { }
