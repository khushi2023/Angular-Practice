import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { TodoService } from '../store/todo.service';
import { appEffects, appStore } from '../store/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appStore),
    provideEffects(appEffects),
    TodoService
  ]
};
