import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(HttpXsrfTokenExtractor);

  const tokenHeaderName = 'X-XSRF-TOKEN';
  const token = tokenService.getToken() as string;

  if (token !== null && !req.headers.has(tokenHeaderName)) {
    req = req.clone({ headers: req.headers.set(tokenHeaderName, token) });
  }
  req = req.clone({ withCredentials: true });

  return next(req);
};
