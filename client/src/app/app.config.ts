import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { errorInterceptor } from './helpers/err-interceptor.interceptor';
import { httpTokenInterceptor } from './helpers/http-token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      // withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'Xsrf-Headers' }),
      withInterceptors([errorInterceptor, httpTokenInterceptor])
    ), provideAnimationsAsync()
  ]
};
