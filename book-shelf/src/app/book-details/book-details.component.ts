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
  bookId:any;
  book:any;
  constructor(private activatedRoute: ActivatedRoute, private bookService: BooksService) { }
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params['book']) {
    //     this.book = JSON.parse(params['book']);
    //     console.log(this.book); // Here you have the entire book object
    //   }
    // }) 
    // this.book= this.bookService.getObj();
    // console.log(this.book);
    console.log(this.bookId);
    
    this.bookService.getParticularBook(this.bookId).subscribe((data:any)=>{
      console.log(data);
      this.book = data
    },(err)=>{
      console.error(err);
      
    })
  }
}