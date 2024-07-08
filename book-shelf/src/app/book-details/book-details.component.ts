import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  bookName:any;
  book:any;
  constructor(private activatedRoute: ActivatedRoute, private bookService: BooksService) { }
  ngOnInit(): void {
    this.bookName = this.activatedRoute.snapshot.paramMap.get('bookName');
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params['book']) {
    //     this.book = JSON.parse(params['book']);
    //     console.log(this.book); // Here you have the entire book object
    //   }
    // }) 
    // this.book= this.bookService.getObj();
    // console.log(this.book);
    this.bookService.getParticularBook(this.bookName).subscribe((data:any)=>{
      console.log(data);
      this.book = data
    })
  }
}