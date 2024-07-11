import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "./todo.service";
import { mergeMap, map, catchError } from "rxjs/operators";
import * as TodoActions from "./actions";
import { of } from "rxjs";
@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private todoService: TodoService) {}
}