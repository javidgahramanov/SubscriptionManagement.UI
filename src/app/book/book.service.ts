import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../core/auth/authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CreateBookRequest} from './add-book/createBookRequest';

@Injectable({providedIn: 'root'})
export class BookService {
  private baseUrl = `${environment.webApiUrl}/book`;

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
  }

  getUserBooks(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  getAllBooks(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/all`);
  }

  addBook(createBookRequest: CreateBookRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, createBookRequest);
  }

  removeFromSale(bookId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/remove-sale/${bookId}`, {});
  }

  reSale(bookId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/resale/${bookId}`, {});
  }

  checkOwner(bookId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/checkowner/${bookId}`);
  }
}
