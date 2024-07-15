import { Component} from '@angular/core';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
imports: [CommonModule,TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Khushi';
}