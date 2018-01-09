import { NgModule } from '@angular/core';

import { MaterialDesignModule } from '../material-design/material-design.module';

import { LoginComponent } from './login/login.component';


/**
 * Module that imports all the modules we use from angular material.
 * We export these modules and import them back into the main application.
 * 
 * Doing so, we make them available to the whole application. 
 * 
 */
@NgModule({
  imports: [MaterialDesignModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule { }
