import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { counterReducer } from '../store/reducers/counter';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),Store,
  //   provideStore({count: counterReducer}),
    // StoreModule.forRoot({count: counterReducer})
  ]
};
