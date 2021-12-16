import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookLoanComponent } from './book-loan/book-loan.component';
import {LoanListComponent} from './loan-list/loan-list.component';
import {UserListComponent} from './user-list/user-list.component';

export const appRoutes: Routes = [
    {
        path: 'books',
        component: BookListComponent
    },
    {
        path: 'loans',
        component: LoanListComponent
    },
    {
        path: 'users',
        component: UserListComponent
    },
    {
      path: 'books/:bookId/loan',
      component: BookLoanComponent
    },
    {
      path: '**',
      redirectTo: '/books',
      pathMatch: 'full'
    }
  ];
