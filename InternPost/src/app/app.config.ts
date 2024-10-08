import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAngularQuery(new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for all queries
        },
        mutations: {
          retry: false, // Disable retries for all mutations (optional)
        },
      },
    })),
    provideAnimations(),
    provideToastr({ positionClass: 'toast-top-center', timeOut: 2000 }),
  ],
};
