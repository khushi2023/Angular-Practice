import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { AppState, AppStore } from '../store/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos$!: Observable<Todo[]>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>,private data:Store<AppStore>) {
    this.todos$ = this.store.select(state => state.todo.todos);
    // this.todos$ = data.pipe(select(todoSelector));
    this.isLoading$ = this.store.select(state => state.todo.loading);
    this.loadTodos();
  }

  loadTodos() {
    this.data.dispatch(TodoActions.loadTodos());
  }

  addTodo(index: number) {

    const todo: Todo = {id: index, description: 'New Todo', completed: false };
    this.store.dispatch(TodoActions.addTodo({ todo }));
    }
    
    complete(todo: Todo) {
      this.store.dispatch(TodoActions.updateTodo({todo : {...todo, completed: true}}));
    }
}
