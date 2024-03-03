import { Routes } from '@angular/router';

import { isAuthenticatedGuard, isNonAuthenticatedGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNonAuthenticatedGuard()],
    loadChildren: () => import('./routes/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'client',
    canActivate: [isAuthenticatedGuard()],
    loadChildren: () => import('./routes/client.routes').then((m) => m.CLIENT_ROUTES),
  },
  {
    path: 'provider',
    canActivate: [isAuthenticatedGuard()],
    loadChildren: () => import('./routes/provider.routes').then((m) => m.PROVIDER_ROUTES),
  },
  {
    path: 'search',
    loadChildren: () => import('./routes/search.routes').then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(c => c.HomePage),
  },

  /* {
    path: '',
    loadComponent: () => import('./pages/').then(c => c.Component),
  }, */
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  /* { path: '**', redirectTo: 'home', pathMatch: 'full' } */
];

