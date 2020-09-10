import {BehaviorSubject, interval, Observable, of, timer} from 'rxjs';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {Injectable} from '@angular/core';
import {User} from '../../user/models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, timeout} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  jwtHelperService = new JwtHelperService();

  public storage: Storage = localStorage;
  public redirectUrl: string;
  public signinStatus = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User>(new User());
  private refreshSubscription: any;
  private offsetSeconds = 30;

  constructor(
    private router: Router,
    private oAuthService: OAuthService,
    private httpClient: HttpClient
  ) {
  }

  public init(): void {

    this.signinStatus.next(true);
    this.user.next(this.getUser());
  }

  public signout(): void {
    this.oAuthService.logOut(true);
    this.redirectUrl = null;
    this.signinStatus.next(false);
    this.user.next(new User());
    this.unscheduleRefresh();
  }


  public isSignedIn(): Observable<boolean> {
    return this.signinStatus.asObservable();
  }

  public userChanged(): Observable<User> {
    return this.user.asObservable();
  }

  public getUserRole(): string {
    const user: User = this.getUser();
    return user.role;
  }

  decodeToken(): any {
    const jwt = this.jwtHelperService.decodeToken(this.oAuthService.getAccessToken());
    return jwt;
  }

  public getUser(): User {
    const user: User = new User();
    if (this.oAuthService.hasValidAccessToken()) {
      const userInfo: any = this.oAuthService.getIdentityClaims();
      user.username = userInfo.name;
      user.role = userInfo.role;
      user.subscriptionId = this.decodeToken().subscriptionId;
      return user;
    }
    return null;
  }

  public scheduleRefresh(): void {
    const source: Observable<number> = interval(
      this.calcDelay(this.getAuthTime())
    );

    this.refreshSubscription = source.subscribe(() => {
      this.oAuthService.refreshToken()
        .then(() => {
          console.warn('Token refreshed');
        })
        .catch((error: any) => {
          this.handleRefreshTokenError();
        });
    });
  }

  public startupTokenRefresh(): void {
    if (this.oAuthService.hasValidAccessToken()) {
      const source: Observable<number> = timer(this.calcDelay(new Date().valueOf()));

      source.subscribe(() => {
        this.oAuthService.refreshToken()
          .then(() => {
            this.scheduleRefresh();
          })
          .catch((error: any) => {
            this.handleRefreshTokenError();
          });
      });
    }
  }

  private unscheduleRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private handleRefreshTokenError(): void {
    this.redirectUrl = this.router.url;

    this.signinStatus.next(false);
    this.user.next(new User());

    this.unscheduleRefresh();

    this.router.navigate(['/login']);
  }

  private calcDelay(time: number): number {
    const expiresAt: number = this.oAuthService.getAccessTokenExpiration();
    const delay: number = expiresAt - time - this.offsetSeconds * 1000;
    return delay > 0 ? delay : 0;
  }

  private getAuthTime(): number {
    return parseInt(this.storage.getItem('access_token_stored_at'), 10);
  }
}
