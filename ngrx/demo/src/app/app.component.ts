import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo';
  count$!:Observable<number>;
  constructor(private store: Store<{count: number}>) {
    // this.count$ = store.pipe(select('count'))
    this.count$ = this.store.select(state => state.count)
  }
  increment(){
    this.store.dispatch({type: 'INCREMENT'})
  }
  decrement(){
    this.store.dispatch({type: 'DECREMENT'})
  }
  reset(){
    this.store.dispatch({type: 'RESET'})
  }
}
