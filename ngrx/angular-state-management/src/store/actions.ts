// state change in your application
import { createAction, props } from '@ngrx/store';
import { Todo } from '../todo.model';

export const loadTodos = createAction('[Todo] Load Todos'); //used to load the list of todos from the server
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: Todo[] }>()); //action is dispatched when the todos are loaded successfully.
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>()); //action is dispatched when there is an error loading the todos.
export const addTodo = createAction('[Todo] Add Todo', props<{ todo: Todo }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ todo: Todo }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string }>());