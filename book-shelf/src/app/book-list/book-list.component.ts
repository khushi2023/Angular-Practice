import { Component, Input, OnInit } from '@angular/core';
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
  // firestore: Firestore = inject(Firestore);
  constructor(private router: Router,private bookService: BooksService ) { 
  }
  id: any;
  public data: any;
  ngOnInit(): void { 
    this.rowData = this.bookService.addBookDetails().map((book:any,index:any) => ({
      id: index + 1,
      name: book.name,
      author: book.author,
      description: book.description,
      price: book.price,
      quantity: book.quantity,
      action: 'edit'
    }));
    // console.log(data);

      // this.rowData=[
      //   {
      //     _id: 1,
      //     name: this.data.name,
      //     author: this.data.author,
      //     description: this.data.description,
      //     price: this.data.price,
      //     quantity: this.data.quantity
      //   }
      // ]
  }

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Author', field: 'author' },
    { headerName: 'desc', field: 'description' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Action', field: 'action', cellRenderer: 'BookDetailsComponent' ,onCellClicked: this.onCellClicked.bind(this)},
  ];

  onCellClicked(event: any): void {
    if (event.colDef.field === 'action') {
      this.id = event.data.id;
      this.router.navigate(['bookDetail', this.id]);
    }
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

