import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../book.service';
import {ToastrService} from 'ngx-toastr';
import {CreateBookRequest} from './createBookRequest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: 'add-book.component.html'
})

export class AddBookComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private bookService: BookService,
              private fb: FormBuilder,
              private router: Router,
              private toastrService: ToastrService) {
  }

  createForm(): void {
    this.formGroup = this.fb.group({
      bookName: new FormControl('', Validators.required),
      bookPrice: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {
    this.createForm();
  }

  submit(): void {
    if (this.formGroup.valid) {
      const bookName = this.formGroup.get('bookName').value;
      const price = this.formGroup.get('bookPrice').value;
      const catalogId = 'ac06b5ad-af65-435c-bb49-4adb5668fd67';
      const bookCreateRequest: CreateBookRequest = {
        bookName,
        price,
        catalogId,
        onSale: true
      };

      this.bookService.addBook(bookCreateRequest).subscribe(resp => {
        this.toastrService.success('The books was successfully added.');
        this.router.navigate(['/books']);
      }, error => {
        console.warn(error);
        this.toastrService.error('Something went wrong while adding books.');
      });
    }
  }
}
