import { Route } from '@angular/router';

export const SEARCH_ROUTES: Route[] = [
  {
    path: 'providers',
    loadComponent: () => import('../pages/search/providers/providers.component').then(c => c.ProvidersComponent),
  },
  {
    path: 'providers/:results',
    loadComponent: () => import('../pages/search/providers/providers.component').then(c => c.ProvidersComponent),
  },
  {
    path: 'services',
    loadComponent: () => import('../pages/search/services/services.component').then(c => c.ServicesComponent),
  },
  {
    path: 'found-provider',
    loadComponent: () => import('../pages/search/providers/found-provider/found-provider.component').then(c => c.FoundProviderComponent),
  },
  {
    path: '',
    redirectTo: 'providers',
    pathMatch: 'full',
  },
];
