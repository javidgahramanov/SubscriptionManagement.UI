import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './core/auth/authentication.service';
import {map} from 'rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc';
import {User} from './user/models/user';
import {NavigationEnd, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'SubscriptionManagement';

  public menuToggle = false;
  public accountToggle = false;
  isAuthenticated: boolean;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private oAuthService: OAuthService) {
  }

  userInfo: User;

  ngOnInit(): void {
    this.authService.userChanged()
      .pipe(map(() => {
          this.isAuthenticated = this.oAuthService.hasValidAccessToken();
          this.userInfo = this.authService.getUser();
        })
      ).subscribe();
  }

  Logout(): void {
    this.authService.signout();
  }
}
