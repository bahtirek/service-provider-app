import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToasterService } from '../../components/toaster/toaster.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToasterService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if([401, 403].includes(error.status)) {
        toaster.show('error', `Sorry!`, 'Unathorized. Please login again.');
        authService.refreshToken();
      } else if(error.status == 400){

        let errorMessage = "";
        if(error.error.message) {
          error.error.message.forEach((message: string) => {
            errorMessage = errorMessage + message + '. \n'
          })
        } else {
          errorMessage = "Something went wrong. Please try later.";
        }
        toaster.show('error', 'Sorry!', errorMessage)
      } else if(error.status == 500){
        toaster.show('error', 'Sorry!', error.error.message)
      } else {
        toaster.show('error', 'Sorry!', 'Something went wrong. Please try later. ')
      }
      return throwError(() => error);
    })
  )
};
