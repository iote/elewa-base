import { NgModule } from '@angular/core';
import { CoreModule } from '../../base-modules/core.module';

import { LoginComponent } from './login/login.component';

/**
 * Module that contains all logic to log in a user, log out and sign up.
 * 
 * Does not contain the user service. This is contained in separate base module called user.
 */
@NgModule({
  imports: [CoreModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule { }
