import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
export class AddBooksComponent implements OnInit{
  button:any;
  isnewBook!: boolean;
  bookId: any;
  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    this.initForm();
    if(this.router.url.startsWith("/editBook")){
      this.button = "Update";
      this.bookService.getParticularBook(this.bookId).subscribe((data:any)=>{
        console.log(data);
        this.bookForm.patchValue(data);
      })
    }else{
      this.button = "Add";
    }
  }

  @Output() bookAdded = new EventEmitter();
  constructor(private toastr: ToastrService,private formBuilder: FormBuilder, private router: Router, private bookService: BooksService, private activatedRoute: ActivatedRoute) { }
  bookForm!: FormGroup;
  public initForm(){
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required,Validators.min(1)]],
      quantity: ['',[Validators.required,Validators.min(1)]],
    });    
  }          
  //on submiting
  onSubmit():void {
    console.log(this.bookForm.value);
    this.bookService.addBookDetails(this.bookForm.value).subscribe((res)=>{
      console.log(res);
      
      this.toastr.success('Book added successfully');
    },(err)=>{
      console.log(err);
    })
    this.router.navigate(['viewBooks']);

  }
}
