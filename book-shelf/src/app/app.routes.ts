import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
    {
        path: 'viewBooks',component: BookListComponent
    },
    {
        path:'editBook/:bookId', component: AddBooksComponent
    },
    {
        path:'addBooks', component: AddBooksComponent
    },
    {
        path:'bookDetail/:bookId', component: BookDetailsComponent
    },
    {
        path: 'cart' , component: CartComponent
    }
];



