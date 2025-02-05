import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url='http://localhost:5000/'
  constructor(private http: HttpClient) { }

  bookData:any;
  bookName:any;


  addBookDetails(obj: any): Observable<any>{
    return this.http.post(`${this.url}addBook`, obj).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    );
  }

  getBookDetails():Observable<void>{
    return this.http.get<void>(`${this.url}getAllBooks`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    )
  }
  getParticularBook(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}getBook/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })      
    )
  }

  //adding book in cart
  addToCart(obj:any){
    this.bookData = obj;
    console.log(this.bookData);
  }

  //getting cart data
  getCartData(){
    return this.bookData;
  }

  //delete book
  deleteBook(id:any):Observable<any>{
    console.log(id);
    
    return this.http.delete<any>(`${this.url}deleteBook/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    )
  }

  //update book
  updateBook(id:any, obj:any):Observable<any>{
    return this.http.put<any>(`${this.url}updateBook/${id}`, obj).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    )
  }
}