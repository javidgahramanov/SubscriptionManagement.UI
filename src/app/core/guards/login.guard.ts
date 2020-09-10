import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {concatMap, map} from 'rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthenticationService} from '../auth/authentication.service';


@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private oAuthService: OAuthService,
              private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isSignedIn().pipe(
      map((signedIn: boolean) => {
      }),
      concatMap(() => this.authService.userChanged().pipe(
        map(() => {
          if (this.oAuthService.hasValidAccessToken()) {
            return false;
          } else {
            this.router.navigate(['/books']);
            return true;
          }
        })
      ))
    );
  }
}
