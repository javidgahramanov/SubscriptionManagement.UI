import {Pipe, PipeTransform} from '@angular/core';
import {BookService} from '../../book/book.service';
import {Observable} from 'rxjs';

@Pipe({
  name: 'checkOwner'
})

export class CheckOwnerPipe implements PipeTransform {
  constructor(private bookService: BookService) {
  }

  transform(bookId: string): Observable<boolean> {
    return this.bookService.checkOwner(bookId);
  }
}
