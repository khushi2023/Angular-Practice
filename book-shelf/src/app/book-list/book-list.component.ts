import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BooksService } from '../services/books.service';
import { AgGridAngular} from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [AgGridAngular, BookDetailsComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  rowData: any[] = [];
  constructor(private router: Router,private bookService: BooksService ) { 
  }
  id: any;
  public data: any;
  ngOnInit(): void {
    this.bookService.getBookDetails().subscribe((data: any) => {
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
    const book = params.data;
    const queryParams = { book: JSON.stringify(book) };
    this.router.navigate(['bookDetail'], { queryParams:  queryParams });
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

