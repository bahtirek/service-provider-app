import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorComponent } from '../../shared/form-helpers/form-error/form-error.component';
import { emailValidator } from '../../shared/form-helpers/validators/email.validator';
import { Credentials } from '../../shared/interfaces/credentials.interface';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interfaces/user.interface';
import { Provider } from '../../shared/interfaces/provider.interface';
import { ProviderProfileService } from 'src/app/pages/provider/provider-profile.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private providerProfileService = inject(ProviderProfileService);

  loginForm: FormGroup;
  validate: boolean = true;
  errorMessage: string = "";

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required]],
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.validate = true;
    if (this.loginForm.valid) {
      const credentials: Credentials = {
        email: this.email?.value,
        password: this.password?.value
      }
      this.auth.login(credentials).subscribe ({
        next: (response) => {
          this.auth.setUser(response);
          if(response?.user?.isProvider) {
            this.checkIfProfileComplete(response);
          } else {
            this.router.navigate(['client']);
          }
        },
        error: (error: any) => {
          console.log(error);
          if(error.status === 401) {
            this.errorMessage = 'Invalid credentials';
          }
        }
      })
    }
  }

  checkIfProfileComplete(user: User) {
    this.providerProfileService.getProviderProfileDetails().subscribe({
      next: (response: Provider) => {
        if(!response || this.isEmpty(response) || !response.availableDays || response.availableDays.length == 0) {
          this.router.navigate(['provider/profile-form']);
        } else {
          this.router.navigate(['provider']);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }
}
