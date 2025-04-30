import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(catchError((err) => {
    console.log(err);
    if ([401, 403].includes(JSON.parse(err.status))) {
      router.navigate(['/auth']);
    }

    const e = err.error.statusCode || err.statusText;

    return throwError(() => e);
  }));
};
