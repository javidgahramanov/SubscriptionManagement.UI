import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from '../book.service';
import {IUserBook} from '../model/IUserBook';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {isGuid} from '../../core/helper';
import {ToastrService} from 'ngx-toastr';
import {SubscriptionService} from '../../subscription/subscription.service';
import {IBook} from '../model/IBook';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {merge, Observable, Subscription} from 'rxjs';
import {combineAll} from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: 'book.component.html',
})

export class BookComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  isGuid = isGuid;
  allBooksObservable: Subscription;
  myBooksObservable: Subscription;

  constructor(private bookService: BookService,
              private toastService: ToastrService,
              private authenticationService: AuthenticationService,
              private subscriptionService: SubscriptionService) {
  }

  bookList: IUserBook[] = [];
  otherBooks: IBook[] = [];
  hasSubscription: boolean = this.authenticationService.getUser().subscriptionId ? true : false;

  isAlreadySubscribed(book): boolean {
    const index = this.bookList.findIndex(b => b.id === book.id &&
      b.subscriptionId === this.authenticationService.getUser().subscriptionId);
    return index !== -1;
  }

  ngOnInit(): void {
    this.blockUI.start('Loading books');

    this.myBooksObservable = this.bookService.getUserBooks().subscribe(data => {
      this.bookList = data;
    }, error => {
      this.blockUI.stop();
      this.toastService.error('Something went wrong while getting books.');
    });

    this.allBooksObservable = this.bookService.getAllBooks().subscribe(data => {
      this.blockUI.stop();

      this.otherBooks = data;
    }, error => {
      this.blockUI.stop();
    });
  }

  unSubscribe(id: string): void {
    this.subscriptionService.unsubscribe(id).subscribe(resp => {
      this.toastService.success('Unsubscription was successful.');
      const index = this.bookList.findIndex(book => book.id === id);
      this.bookList.splice(index, 1);
    }, error => {
      this.toastService.error('Something went wrong while unsubscribing');
    });
  }

  subscribe(id: string): void {
    this.subscriptionService.subscribe(id).subscribe(resp => {
      this.toastService.success('You successfully subscribed to the book');
      const index = this.otherBooks.findIndex(b => b.id === id);
      const book = this.otherBooks[index];

      this.bookList.push(
        {
          id: book.id,
          bookName: book.bookName,
          price: book.price,
          catalogId: book.catalogId,
          subscriptionId: resp.subscriptionId,
          onSale: resp.onSale,
          bookUserId: resp.id
        }
      );
    }, error => {
      this.toastService.error('Something went wrong while subscribing');
    });
  }

  operation(operationType: any, book: IUserBook): void {
    if (operationType === 'removeFromSale') {
      this.bookService.removeFromSale(book.id).subscribe(resp => {
        const findIndex = this.bookList.findIndex(c => c.id === book.id);
        this.bookList[findIndex].onSale = resp.onSale;
        const bookIndexInAllBookTable = this.otherBooks.findIndex(c => c.id === book.id);

        this.otherBooks.splice(bookIndexInAllBookTable, 1);
        this.toastService.success('Book successfully removed from sale.');
      });
    }
    if (operationType === 'resale') {
      this.bookService.reSale(book.id).subscribe(resp => {
        const findIndex = this.bookList.findIndex(c => c.id === book.id);
        console.log(this.bookList[findIndex]);
        this.bookList[findIndex].onSale = resp.onSale;
        this.toastService.success('Book successfully added to the sale list.');
      });
    }
  }

  ngOnDestroy(): void {
    this.allBooksObservable.unsubscribe();
    this.myBooksObservable.unsubscribe();
  }
}
