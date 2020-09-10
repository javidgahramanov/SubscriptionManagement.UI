import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {SharedMaterialModule} from '../shared/shared.material.module';
import {CommonModule} from '@angular/common';
import {BlockUIModule} from 'ng-block-ui';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {BookComponent} from '../book/books/book.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {AddBookComponent} from '../book/add-book/add-book.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginGuard} from '../core/guards/login.guard';

const routes: Routes = [
  {path: '', component: RegistrationComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    RegistrationComponent
  ],
  declarations: [RegistrationComponent],
  providers: [],
})
export class SignUpModule {
}
