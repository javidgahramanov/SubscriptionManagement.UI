import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../core/auth/authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SubscriptionService {
  private baseUrl = `${environment.webApiUrl}/subscription`;

  constructor(private httpClient: HttpClient,
              private authService: AuthenticationService) {
  }

  unsubscribe(bookId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/unsubscribe/${bookId}`);
  }

  subscribe(bookId: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/subscribe/${bookId}`, {});
  }

  getSubscriptions(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/`, {});
  }

  purchase(subscriptionId: string): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/purchase/${subscriptionId}`, {});
  }
}
