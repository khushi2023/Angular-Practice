import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { AppState, AppStore } from '../store/store';
import { Store } from '@ngrx/store';
import { loadTodos, addTodo, updateTodo } from '../store/actions';

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
    console.log(this.todos$);
    
    this.data.dispatch(loadTodos());
    console.log(this.todos$);
    
  }

  addTodo(index: number) {
    console.log(index);
    const todo: Todo = {id: index, description: 'New Todo', completed: false };
    console.log(todo);
    
    this.store.dispatch(addTodo({ todo }));
    }
    
  complete(todo: Todo) {
    this.store.dispatch(updateTodo({todo : {...todo, completed: true}}));
  }
}
