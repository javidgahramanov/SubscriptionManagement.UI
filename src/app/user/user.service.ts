import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {IRegisterRequest} from '../sign-up/model/IRegisterRequest';

@Injectable({providedIn: 'root'})
export class UserService {
  registrationCompleted = new Subject<{ completed: boolean, username: string, password: string }>();
  private baseUrl = `${environment.webApiUrl}/users`;

  constructor(private httpClient: HttpClient) {
  }

  register(registerRequest: IRegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, registerRequest);
  }
}
