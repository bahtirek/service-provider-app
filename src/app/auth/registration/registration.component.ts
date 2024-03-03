import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { passwordValidator } from '../../shared/form-helpers/validators/password.validator';
import { passwordMatchValidator } from '../../shared/form-helpers/validators/password-match.validator';
import { FormErrorComponent } from '../../shared/form-helpers/form-error/form-error.component';
import { Router, RouterLink } from '@angular/router';
import { emailValidator } from '../../shared/form-helpers/validators/email.validator';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  registrationIsOn: boolean = true;
  registrationForm: FormGroup;
  validate: boolean = false;
  validateConfirmPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      userType: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator.bind(this)
    });
  }

  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }
  get userType() { return this.registrationForm.get('userType'); }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    this.validateConfirmPassword = !this.validateConfirmPassword;
    if(!confirmPassword?.value) {
      confirmPassword?.setErrors({ required: true });
    } else if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    this.validate = true;
    if (this.registrationForm.valid) {
      const user : User = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        password: this.password?.value,
      }
      if(this.userType?.value === 'provider') {
        user.isProvider = true;
      } else {
        user.isClient = true;
      }
      this.auth.registration(user).subscribe ({
        next: (user) => {
          this.registrationIsOn = false;
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }
}
