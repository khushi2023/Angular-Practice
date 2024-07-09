import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
ngOnInit(): void {
    const cartData = this.bookService.getCartData();
    this.cartBooks.push(cartData)
}
constructor(public bookService: BooksService){}
  cartBooks: any[]=[];

}
