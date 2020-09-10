import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {SubscriptionService} from '../subscription.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-purchase',
  templateUrl: 'purchase.component.html'
})

export class PurchaseComponent implements OnInit {
  constructor(private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private oauthService: OAuthService,
              private subscriptionService: SubscriptionService) {
  }

  purchasingSuccessful: boolean;

  @BlockUI() blockUI: NgBlockUI;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id.toString();
    this.blockUI.start('Signing in..');
    this.subscriptionService.purchase(id).subscribe(resp => {
      this.purchasingSuccessful = true;
      this.blockUI.stop();
      this.oauthService.refreshToken();
    }, error => {
      this.purchasingSuccessful = false;
    });
  }
}
