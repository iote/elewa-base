import {AbstractControl} from '@angular/forms';

/** 
 * Reactive Form Validator - Match passwords
 *  src: https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2
 */
export class PasswordValidation {

  /**
   * Expects names of password fields to match. Returns validtor for those fields.
   */
  static MatchPassword(password1, password2): (AC: AbstractControl) => any {
       
    return function (AC: AbstractControl) {
      const password = AC.get(password1).value; // Get value in input tag
      const confirmPassword = AC.get(password2).value; // Get value in input tag

      if(password !== confirmPassword) 
        AC.get('confirmPassword').setErrors( {MatchPassword: true} );
      else
        return null;
    };

  }

}
