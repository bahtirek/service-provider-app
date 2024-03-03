import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  { path: 'login', loadComponent: () => import('../auth/login/login.component').then(c => c.LoginComponent) },
  {
    path: 'registration',
    loadComponent: () => import('../auth/registration/registration.component').then(c => c.RegistrationComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
