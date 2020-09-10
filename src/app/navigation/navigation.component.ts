import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationService} from './service/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: 'navigation.component.html',
  encapsulation: ViewEncapsulation.Emulated
})

export class NavigationComponent implements OnInit {
  constructor(private navigationService: NavigationService) {
  }

  items = this.navigationService.getNavigation();

  ngOnInit(): void {
  }
}
