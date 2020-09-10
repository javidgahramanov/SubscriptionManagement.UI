import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthenticationService} from '../core/auth/authentication.service';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {UserService} from '../user/user.service';
import {catchError, timeout} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessages: any[] = [];
  @BlockUI() blockUI: NgBlockUI;
  isRegistration = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private oauthService: OAuthService,
              private userService: UserService,
              protected authenticationService: AuthenticationService,
              private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.createForm();
    if (this.authenticationService.getUser()) {
      this.router.navigate(['books']);
    }

    this.userService.registrationCompleted.subscribe(rg => {
      this.isRegistration = !rg.completed;

      if (rg.completed) {
        this.loginForm.setValue({
          email: rg.username,
          password: rg.password
        });
        console.log(rg);
        this.login();
      }
    });
  }

  login(): void {
    if (this.loginForm.valid) {

      this.blockUI.start('Signing in..');
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      if (this.oauthService.tokenEndpoint === null) {
        this.oauthService.tokenEndpoint = environment.identityServer.url;
      }
      this.oauthService.loadDiscoveryDocument(`${environment.identityServer.url}/.well-known/openid-configuration`).then(c => {
        this.oauthService
          .fetchTokenUsingPasswordFlowAndLoadUserProfile(email, password)
          .then(() => {
            this.authenticationService.init();

            this.authenticationService.scheduleRefresh();

            const redirect: string = this.authenticationService.redirectUrl
              ? this.authenticationService.redirectUrl
              : '/books';
            if (this.oauthService.hasValidAccessToken()) {
              return Promise.resolve();
            }
            this.blockUI.stop();
            this.router.navigate([redirect]);
          })
          .catch((errorResponse: HttpErrorResponse) => {
            if (errorResponse.error !== '') {
              switch (errorResponse.error.error) {
                case 'invalid_grant':
                  this.toastrService.error('Invalid email or password');
                  this.errorMessages.push({description: 'Invalid email or password.'});
                  break;
                default:
                  this.errorMessages.push({description: 'Server is not available. Please Try again.'});
                  this.toastrService.error('Server is not available. Please Try again.');
              }
            } else {
              this.errorMessages.push({description: 'Server error. Try later.'});
              this.toastrService.error('Server error. Try later.');
            }
            this.blockUI.stop();
          });
      });
    }
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('',
        [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  Submit(): void {
    this.login();
  }
}
