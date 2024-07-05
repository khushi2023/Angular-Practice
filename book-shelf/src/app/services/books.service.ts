import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }
  bookData:any[]=[]
  // private bookData = [
  //   { id: 1, name: 'Book 1', author: 'Author 1', description: 'Description 1', price: 25.99, quantity: 10 },
  //   { id: 2, name: 'Book 2', author: 'Author 2', description: 'Description 2', price: 19.99, quantity: 15 },
  //   { id: 3, name: 'Book 3', author: 'Author 3', description: 'Description 3', price: 29.99, quantity: 8 },
  //   { id: 4, name: 'Book 4', author: 'Author 4', description: 'Description 4', price: 32.99, quantity: 12 },
  // ];
  getBookDetails(obj: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        this.bookData.push(obj);
        localStorage.setItem('bookData', JSON.stringify(this.bookData));
        resolve();
      } catch (error) {
        reject('Failed to add book: ' + error);
      }
    });
  }

  addBookDetails(){
    const data = localStorage.getItem('bookData');
    return JSON.parse(data || '[]');
    // if(data){
    //   return data;
    // }
    // else{
    //   return [];
    // }
  }
}
