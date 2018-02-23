import { FormBuilder, Validators } from "@angular/forms";
import { PasswordValidation } from "../../../base-modules/reactive-form-extensions/match-password.validator";

export class RegisterViewModel {
  
  static CreateForm(fb: FormBuilder) {

    return fb.group({
                // Possibility, add async form validator checking if user name exists
      username: ['', [Validators.required, 
                      Validators.minLength(4)]],

      password: fb.group({
          password:  ['', [Validators.required, 
                           // At least 8 chars of which 1 num, 1 char, 1 special
                           Validators.pattern(/^(?=\S*[A-z])(?=\S*\d)(?=\S*([^\w\s]|[_]))\S{8,}$/)]
          ],
          confirmPassword: ['', Validators.required],
        },
        { validator: PasswordValidation.MatchPassword('password', 'confirmPassword') }
      ),

      name: fb.group({
        fName: ['', Validators.required],
        lName: ['', Validators.required],
      }),
             // Possibility, add async form validator to check for duplicate employee numbers.
      empNo: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      telephone: [''],

      idNo: [''],

      role: ['eta', Validators.required],

    });

  }
  
}
