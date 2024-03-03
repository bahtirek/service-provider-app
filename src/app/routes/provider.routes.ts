import { Route } from '@angular/router';
import { ProviderShellComponent } from '../pages/provider/provider-shell.component';


export const PROVIDER_ROUTES: Route[] = [
  {path: '', component: ProviderShellComponent,
    children: [
      {
        path: 'profile-form',
        loadComponent: () => import('../pages/provider/profile-form/profile-form.component').then((c) =>c.ProfileFormComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/provider/dashboard/dashboard.component').then((c) =>c.DashboardComponent),
      },
      {
        path: 'my-client',
        loadComponent: () => import('../pages/provider/dashboard/my-client/my-client.component').then((c) =>c.MyClientComponent),
      },
      {
        path: 'my-client/messages',
        loadComponent: () => import('../pages/messages/messages.component').then((c) =>c.MessagesComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/provider/profile/profile.component').then((c)=>c.ProfileComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]
  },
];
