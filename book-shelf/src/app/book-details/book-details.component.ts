import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})

export class BookDetailsComponent implements OnInit {
  bookId:any;
  public book!:any;
  constructor(private activatedRoute: ActivatedRoute, private bookService: BooksService) { }
  
  //service to call an api based on id toget particular book
  public getBook(){
    this.bookService.getParticularBook(this.bookId).subscribe((data:any)=>{
      console.log(data);
      this.book = data
    },(err)=>{
      console.error(err);
    })
  }
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    console.log(this.bookId);
   this.getBook();
  }
}