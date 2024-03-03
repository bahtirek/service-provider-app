import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const isAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.user().accessToken) {
      return true;
    }

    return router.parseUrl('auth/login');
  };
};
export const isNonAuthenticatedGuard = (): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.user().accessToken) {
      return true;
    }

    return router.parseUrl('home');
  };
};
