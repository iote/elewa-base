import { FormBuilder, Validators } from "@angular/forms";
import { PasswordValidation } from "../../../base-modules/reactive-form-extensions/match-password.validator";

export function CreateLoginViewModel(fb: FormBuilder) {

  return fb.group({
              // Possibility, add async form validator checking if user name exists
    username: ['', Validators.required],

    password: ['', Validators.required],

  });

}
