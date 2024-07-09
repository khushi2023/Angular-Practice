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
  setObj(obj:any){
    this.bookData = obj;
    console.log(this.bookData);
  }
  deleteBook(id:any):Observable<any>{
    console.log(id);
    
    return this.http.delete<any>(`${this.url}deleteBook/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(()=> error);
      })
    )
    
  }

  private isnewBook: boolean = true;
  getnewBookFlag():boolean{
    console.log(this.isnewBook);
    return this.isnewBook;
  }
  setnewBookFlag(flag:boolean):void{
    this.isnewBook = flag;
  }
}