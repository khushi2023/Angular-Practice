import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-shelf';

}
