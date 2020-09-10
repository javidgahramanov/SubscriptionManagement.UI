import {NgModule} from '@angular/core';
import {NavigationComponent} from '../navigation/navigation.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BlockUIModule} from 'ng-block-ui';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BlockUIModule,

  ],
  exports: [NavigationComponent, BlockUIModule, CommonModule],
  declarations: [NavigationComponent],
  providers: [],
})
export class SharedModule {
}
