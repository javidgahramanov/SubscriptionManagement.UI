import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {SharedModule} from '../shared/shared.module';
import {SharedMaterialModule} from '../shared/shared.material.module';
import {CommonModule} from '@angular/common';
import {BlockUIModule} from 'ng-block-ui';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {PurchaseComponent} from './purchase/purchase.component';

const routes: Routes = [
  {path: '', component: SubscriptionsComponent, canActivate: [AuthGuard]},
  {path: 'purchase/:id', component: PurchaseComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    SharedMaterialModule,
    CommonModule,
    BlockUIModule,
    ReactiveFormsModule,
    MatTabsModule],
  exports: [],
  declarations: [SubscriptionsComponent, PurchaseComponent],
  providers: [],
})
export class SubscriptionModule {
}
