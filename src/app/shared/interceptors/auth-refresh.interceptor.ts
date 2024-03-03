import { Injectable, inject } from '@angular/core';
import { from, lastValueFrom, shareReplay, take } from "rxjs";
import {  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../../components/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRefreshInterceptor implements HttpInterceptor {
  auth = inject(AuthService);
  toaster = inject(ToasterService);
  count=0

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next))
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.auth?.user()?.accessToken) return await lastValueFrom(next.handle(req));

    if(!this.auth.isTokenExpired()) {
      this.count = 0
      const authReq = injectToken(req, this.auth.user()?.accessToken);

      return await lastValueFrom(next.handle(authReq));
    }

    if (this.auth.isTokenExpired() && this.count == 1) {
      const authReq = injectToken(req, this.auth.user()?.accessToken);

      return await lastValueFrom(next.handle(authReq));
    }

    if (this.auth.isTokenExpired() && this.count == 2) {
      this.count = 0;
      //this.auth.logout('login');
    }

    if (this.auth.isTokenExpired() && this.count == 0) {
      this.count++
      const user$ = this.auth.refreshToken();
      const user = await lastValueFrom(user$);
      this.auth.setUser(user);
      this.toaster.show('success', `Attn`, 'Token refreshed.');
      const authReq = injectToken(req, this.auth.user()?.accessToken);

      return await lastValueFrom(next.handle(authReq));
    } else {
      return await lastValueFrom(next.handle(req))
    }

  }
}

const injectToken = (request: HttpRequest<any>, token?: string) => {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
