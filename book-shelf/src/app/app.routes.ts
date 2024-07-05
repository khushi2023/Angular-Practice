import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
    {
        path:'', component: HomeComponent
    },
    {
        path: 'viewBooks',component: BookListComponent
    },
    {
        path:'addBooks', component: AddBooksComponent
    },
    {
        path:'bookDetail/:bookId', component: BookDetailsComponent
    }
];



