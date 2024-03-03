import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(password: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const confirmPasswordValidator = control.value === password;

    return confirmPasswordValidator ? null : { confirmPasswordValidator: true };
  };
}
