import { Component, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css'
})
export class AddBooksComponent {
  @Output() bookAdded = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  bookForm = this.formBuilder.group({
    name: ['', Validators.required],
    author: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    quantity: ['',Validators.required]
  });

  onSubmit() {
    console.log(this.bookForm.value);
    // this.bookAdded.emit(this.bookForm.value);
    
    this.router.navigate(['viewBooks']);
  }
}
