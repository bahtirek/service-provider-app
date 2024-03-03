import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  private _validate: boolean | undefined = undefined;
  private _initialValueCallIsDone: boolean = false;
  private _initialValidateCallIsDone: boolean = false;

  errorMessage: string = "";
  controlErrors: any | null = null;

  @Input() control!: AbstractControl | null;

  @Input() set onValueChanges(onValueChanges: string | undefined) {
    if (this._validate && this.isInitialCallsDone()) this.startValidation();
    this._initialValueCallIsDone = true;
  }

  @Input() set validate(validate: boolean | undefined) {
    this._validate = validate;

    if (this._validate && this.isInitialCallsDone()) this.startValidation();
    this._initialValidateCallIsDone = true;
  }

  @Input() set validateOnce(validate: boolean | undefined) {
    if (this._validate && this.isInitialCallsDone()) this.startValidation();
  }

  @Input() set message(message: string) {
    this.errorMessage = message;
  }

  isInitialCallsDone() {
    return (this._initialValidateCallIsDone && this._initialValueCallIsDone)
  }

  startValidation() {
    if (this.control?.errors) {
      const errors = this.control?.errors;
      for (let i = 0; i < this.rules.length; i++) {
        const rule = this.rules[i];
        if (errors?.hasOwnProperty(rule.error)) {
          this.errorMessage = rule.message;

          if(rule.error == 'minlength') this.errorMessage = this.errorMessage + ' ' + errors['minlength'].requiredLength;

          break;
        }
      }
    } else {
      this.errorMessage = ""
    }
  }


  rules = [
    {error: "required", message: 'Field is required'},
    {error: "emailValidator", message: 'Wrong email format'},
    {error: "passwordValidator", message: 'Password must contain ...'},
    {error: "passwordMatchValidator", message: 'Passwords should match'},
    {error: "minlength", message: `length should be`},
    {error: "maxlength", message: `length should be`},
    {error: "passwordMismatch", message: `Password should match`},
  ]

}
