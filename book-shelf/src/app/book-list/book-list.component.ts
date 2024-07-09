import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { BooksService } from '../services/books.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [AgGridAngular, BookDetailsComponent, CommonModule,NavbarComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  viewBooksInAgGrid: boolean = true;
  rowData: any[] = [];
  books: any;
  edit: boolean = false;
  isnewBook: boolean = true;
  constructor(private router: Router, private bookService: BooksService, private zone: NgZone) {
  }
  id: any;
  public data: any;

  agGrid() {
    this.viewBooksInAgGrid = true;
  }
  viewCards() {
    this.viewBooksInAgGrid = false;
  }
  onSearch() {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("bookByName") as HTMLInputElement).value,
    );
  }

  //display all books in ag-grid table
  bookListShow() {
    this.bookService.getBookDetails().subscribe((data: any) => {
      console.log(data);

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
    {
      headerName: 'Action',
      field: 'action',
      width: 300,
      cellRenderer: (params: any) => {

        // Edit button
        const container = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.style.marginRight = '8px';
        editButton.classList.add('btn', 'btn-primary', 'mr-2');
        editButton.addEventListener('click', () => {
          this.zone.run(() => {
            this.editBook(params);
          });
        });
        container.appendChild(editButton);

        // View button
        const viewButton = document.createElement('button');
        viewButton.innerHTML = 'View';
        viewButton.style.marginRight = '8px';
        viewButton.classList.add('btn', 'btn-success', 'mr-2');
        viewButton.addEventListener('click', () => {
          this.zone.run(() => {
            this.openBookDetails(params);
          });
        });
        container.appendChild(viewButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.addEventListener('click', () => {
          this.zone.run(() => {
            this.deleteRow(params);
          });
        });
        container.appendChild(deleteButton);
        return container;
      },
    }
  ];

  openBookDetails(params: any) {
    console.log(this.edit);
    console.log(params);
    this.edit = true;
    console.log(this.edit);

    const bookId = typeof params === 'string' ? params : params.data.action;
    //calling service to get particular book
    this.router.navigate(['bookDetail', bookId]);
  }
  deleteRow(params: any) {
    console.log(params.data.action);

    this.bookService.deleteBook(params.data.action).subscribe(() => {
      alert("Book deleted successfully");
    },(err)=>{
      alert("Book not deleted");
    });

    console.log("deleted");
  }
  editBook(params: any) {
    console.log(params.data.action);
    // this.bookService.setnewBookFlag(false);
    this.router.navigate(['editBook', params.data.action]);
    console.log("edited");
  }
  OnGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  gridApi!: GridApi;
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  addBook(){
    this.router.navigate(['addBooks']);
  }
  ngOnInit(): void {
    this.bookListShow();
  }
}

