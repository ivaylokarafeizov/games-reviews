import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingPasswordsValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(controlName)?.value;
    const rePassword = control.parent?.get(matchingControlName)?.value;
    if (password && rePassword && password !== rePassword) {
      return { matchPassword: true };
    }
    return null;
  };
}
