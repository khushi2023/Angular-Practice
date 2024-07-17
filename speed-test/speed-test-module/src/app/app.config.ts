import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { SpeedTestModule, SpeedTestService } from 'ng-speed-test';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HttpClientModule,provideHttpClient(),SpeedTestModule,SpeedTestService]
};