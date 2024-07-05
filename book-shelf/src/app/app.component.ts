import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-shelf';
  // firestore: Firestore = inject(Firestore);
  // constructor() {
  //   const itemCollection = collection(this.firestore, 'BookList');
  // }
}
