import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private url='http://localhost:5000/'
  constructor(private http: HttpClient) { }
  bookData:any[]=[]
  // private bookData = [
  //   { id: 1, name: 'Book 1', author: 'Author 1', description: 'Description 1', price: 25.99, quantity: 10 },
  //   { id: 2, name: 'Book 2', author: 'Author 2', description: 'Description 2', price: 19.99, quantity: 15 },
  //   { id: 3, name: 'Book 3', author: 'Author 3', description: 'Description 3', price: 29.99, quantity: 8 },
  //   { id: 4, name: 'Book 4', author: 'Author 4', description: 'Description 4', price: 32.99, quantity: 12 },
  // ];
  addBookDetails(obj: any): Observable<any>{
    return this.http.post(`${this.url}addBooks`, obj).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    );
  }
  

  getBookDetails():Observable<void>{
    return this.http.get<void>(`${this.url}getBooks`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    )
  }

  
}
