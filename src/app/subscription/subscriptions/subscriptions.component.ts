import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {ISubscription} from '../model/ISubscription';
import {SubscriptionService} from '../subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: 'subscriptions.component.html',
  styleUrls: ['subscriptions.component.css']
})

export class SubscriptionsComponent implements OnInit {
  constructor(private authService: AuthenticationService,
              private subscriptionService: SubscriptionService) {
  }

  subscriptionList: ISubscription[] = [];

  ngOnInit(): void {
    this.subscriptionService.getSubscriptions().subscribe(resp => {
      this.subscriptionList = resp;
    });
  }
}
