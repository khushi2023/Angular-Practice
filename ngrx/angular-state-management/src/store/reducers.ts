// Reducers are pure functions that take the current state and an action and return a new state. They are responsible for handling the state changes in your application.
import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todo.model";
// import * as TodoActions from './actions';
import { loadTodos, loadTodosSuccess, loadTodosFailure, addTodo, updateTodo, deleteTodo } from "./actions";
export interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string;
}

export const initialState: TodoState = {
    todos: [],
    loading: false,
    error: ''
};

export const todoReducer = createReducer(
    initialState,
    
    on(loadTodos, state => ({ ...state, loading: true })),
    
    on(loadTodosSuccess, (state, { todos }) =>({ ...state, todos, loading: false })),
    
    on(loadTodosFailure, (state, { error }) => ({ ...state, error, loading: false })),
    
    on(addTodo, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),
    
    on(updateTodo, (state, { todo }) => ({ ...state, todos: state.todos.map(t => t.id === todo.id ? todo : t) })),
    
    on(deleteTodo, (state, { id }) => ({ ...state, todos: state.todos.filter(t => t.id !== id) })),
    );