import {Injectable} from '@angular/core';

export interface INavigationItem {
  label: string;
  route: string;
  icon: string;
}

@Injectable({providedIn: 'root'})
export class NavigationService {

  constructor() {
  }

  getNavigation(): INavigationItem[] {
    const items: INavigationItem[] = [
      {
        label: 'Books',
        route: '/books',
        icon: 'book'
      },
      {
        label: 'Subscriptions',
        route: '/subscriptions',
        icon: 'card_membership'
      },
      {
        label: 'Add Book',
        route: '/books/add',
        icon: 'library_add'
      }
    ];
    return items;
  }
}
