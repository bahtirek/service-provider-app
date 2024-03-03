import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  console.log(auth?.user()?.accessToken);
  if (!auth?.user()?.accessToken) return next(req);
  console.log(auth?.user()?.accessToken);

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.user()?.accessToken}`)
    })
  return next(authReq);
};
