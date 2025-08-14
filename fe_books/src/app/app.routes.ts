import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { noAuthGuard } from './no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/book-list/book-list').then((c) => c.BookListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'books/new',
    loadComponent: () =>
      import('./pages/book-new/book-new').then((c) => c.BookNewComponent),
    canActivate: [authGuard],
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./pages/book-list/book-list').then((c) => c.BookListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((c) => c.LoginComponent),
	canActivate: [noAuthGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup').then((c) => c.SignupComponent),
	canActivate: [noAuthGuard],
  },
];
