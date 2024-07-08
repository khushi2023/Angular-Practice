import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BooksService } from '../services/books.service';
import { AgGridAngular} from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [AgGridAngular, BookDetailsComponent, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  viewBooksInAgGrid: boolean = true;
  rowData: any[] = [];
  books:any;
  constructor(private router: Router,private bookService: BooksService ) { 
  }
  id: any;
  public data: any;

  agGrid(){
    this.viewBooksInAgGrid = true;
  }
  viewCards(){
    this.viewBooksInAgGrid = false;
  }
  onSearch(){
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("bookByName") as HTMLInputElement).value,
    );
  }
  ngOnInit(): void {
    this.bookService.getBookDetails().subscribe((data: any) => {
      this.books = data
      this.rowData = data.map((book: any, index: any) => ({
        id: index + 1,
        name: book.name,
        author: book.author,
        description: book.description,
        price: book.price,
        quantity: book.quantity,
        action: book._id
      }))
    }) 
  }

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Author', field: 'author' },
    { headerName: 'desc', field: 'description' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Action', field: 'action', cellRenderer: (params:any)=>{
      return `<button type="button" class="btn btn-primary">View</button>`
    },onCellClicked:this.openBookDetails.bind(this)},
  ];
  openBookDetails(params:any) {
    console.log(params.data)
    const bookName = params.data.name;
    console.log(bookName);
    
    // this.bookService.setObj(book);
    this.router.navigate(['bookDetail',{bookName:bookName}]);
  }
  OnGridReady(params: GridReadyEvent) {
		this.gridApi = params.api;
	  }
	  gridApi!: GridApi;
    defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
}

