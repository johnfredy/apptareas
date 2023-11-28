import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routeConfig } from './app.routes';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routeConfig)]
  providers: [provideHttpClient(), provideProtractorTestingSupport(), provideRouter(routeConfig)],
};
