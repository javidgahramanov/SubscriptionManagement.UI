import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LoginGuard} from './core/guards/login.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {
    path: 'books',
    loadChildren: () => import('src/app/book/book.module')
      .then(m => m.BookModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('src/app/subscription/subscription.module')
      .then(m => m.SubscriptionModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {
}
