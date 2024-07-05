import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css'
})
export class AddBooksComponent {
  @Output() bookAdded = new EventEmitter();
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder, private router: Router, private bookService: BooksService) { }
  bookForm = this.formBuilder.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required,Validators.min(1)]],
    quantity: ['',[Validators.required,Validators.min(1)]],
  });              

  //on submiting
  onSubmit():void {
    console.log(this.bookForm.value);
    this.bookService.getBookDetails(this.bookForm.value).then(()=>{
      this.toastr.success('Book added successfully');
    })
    .catch((err)=>{
      this.toastr.error(err);
    });
    this.router.navigate(['viewBooks']);
  }
}
