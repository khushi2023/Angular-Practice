import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book:any;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    // this.id = this.activatedRoute.snapshot.paramMap.get('bookId');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['book']) {
        this.book = JSON.parse(params['book']);
        console.log(this.book); // Here you have the entire book object
      }
    }) 
  }
}