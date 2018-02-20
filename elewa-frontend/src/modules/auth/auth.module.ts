import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../base-modules/core.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


/**
 * Module that contains all logic to log in a user, log out and sign up.
 * 
 * Does not contain the user service. This is contained in separate base module called user.
 */
@NgModule({
  imports: [CoreModule, FormsModule],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule { }
