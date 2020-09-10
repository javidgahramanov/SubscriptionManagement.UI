import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './books/book.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {SharedModule} from '../shared/shared.module';
import {SharedMaterialModule} from '../shared/shared.material.module';
import {AddBookComponent} from './add-book/add-book.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckOwnerPipe} from '../core/pipes/check-owner.pipe';

const routes: Routes = [
  {path: '', component: BookComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddBookComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    SharedMaterialModule,
    ReactiveFormsModule
  ],
  exports: [CheckOwnerPipe],
  declarations: [BookComponent, AddBookComponent, CheckOwnerPipe],
  providers: [],
})
export class BookModule {
}
